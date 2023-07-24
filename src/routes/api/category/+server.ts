import type {
	AllCategoryUrls,
	CachedCategory,
	Categories,
	CategoryWithSubCategories,
	SubCategory
} from '$lib/interfaces/category';
import { upstashClient } from '$lib/server/upstash.js';
import { generateUrls } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, fetch }) {
	const allCategoriesKey = 'all_categories';
	const allCategoriesUrlKeys = 'category_urls';

	const [cachedCategories, cachedUrls] = await Promise.all([
		upstashClient.get(fetch, allCategoriesKey),
		upstashClient.get(fetch, allCategoriesUrlKeys)
	]);

	if (
		cachedCategories.result &&
		Object.keys(cachedCategories.result).length > 0 &&
		cachedUrls.result &&
		Object.keys(cachedUrls.result).length > 0
	) {
		const categories = JSON.parse(cachedCategories.result.toString());
		const categoryUrls = JSON.parse(cachedUrls.result.toString());

		return json({ categories: categories, categoryUrls: categoryUrls });
	}

	const { data, error } = await supabase.from('category').select('id, name, subcategory(id, name)');

	if (data) {
		const categoryUrls = await generateUrls(data);
		const commands = [];

		for (const category of data) {
			const categoryKey = `category:${category.name
				.replace(/\s+/g, '')
				.toLowerCase()
				.substring(0, 3)}`;

			commands.push([
				'HMSET',
				categoryKey,
				'id',
				category.id,
				'name',
				category.name,
				'subcategory',
				JSON.stringify(category.subcategory),
				'categoryUrls',
				JSON.stringify(categoryUrls.find((cu) => cu.id === category.id))
			]);
		}

		const cachedCategories: Categories = data.map((category) => ({
			id: category.id,
			name: category.name,
			subcategory: category.subcategory
		}));

		const cachedUrls: AllCategoryUrls = categoryUrls.map((url) => ({
			id: url.id,
			categoryUrl: url.categoryUrl,
			subCategoryUrls: url.subCategoryUrls
		}));

		commands.push(['SET', allCategoriesKey, JSON.stringify(cachedCategories)]);
		commands.push(['SET', allCategoriesUrlKeys, JSON.stringify(cachedUrls)]);

		await upstashClient.pipeline(fetch, commands);

		return json({ categories: cachedCategories, categoryUrls: cachedUrls });
	}

	return json({ categories: [], message: 'No categories found.' });
}

export async function POST({ request, fetch }) {
	const requestData = (await request.json()) as { name: string };
	const key = `category:${requestData}`;

	// Retrieve category data from Redis using the key
	const cachedResult = await upstashClient.hgetall(fetch, key);

	// If category data exists in Redis, return the category
	if (cachedResult.result) {
		const category: CachedCategory = {
			id: Number(cachedResult.result.id),
			name: cachedResult.result.name,
			subcategory: JSON.parse(cachedResult.result.subcategory) as SubCategory[],
			urls: JSON.parse(cachedResult.result.categoryUrls)
		};
		return json(category);
	}

	return json({ category: null, message: 'Could not find category.' });
}
