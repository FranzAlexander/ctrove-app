import type { AttributeWithOptions } from '$lib/interfaces/attribute';
import type {
	CachedCategory,
	CategoryWithSubCategories,
	SubCategory
} from '$lib/interfaces/category';
import type { ProductCard, ProductPaginationOptions } from '$lib/interfaces/product';
import { generateSubUrls } from '$lib/utils';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const { category: rawCategoryName, subcategory: rawSubCategoryName } = params;

	// Transform the params
	const categoryName = decodeURIComponent(rawCategoryName.replace(/-/g, ' '));

	const subCategoryName =
		rawSubCategoryName !== 'All-in-one'
			? decodeURIComponent(rawSubCategoryName.replace(/-/g, ' '))
			: 'All-in-one';

	const categoryResult = await fetch('/api/category', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(categoryName.toLowerCase().substring(0, 3))
	});

	const category = (await categoryResult.json()) as CachedCategory;
	const subcategoryId =
		(category && subCategoryName !== 'all'
			? category.subcategory.find((subcat: SubCategory) => subcat.name === subCategoryName)?.id
			: null) || null;

	const paginationOptions = {
		categoryId: category.id,
		subcategoryId: subcategoryId,
		offset: 0,
		limit: 5
	} as ProductPaginationOptions;

	const products = await fetch('/api/product', {
		method: 'POST',
		body: JSON.stringify(paginationOptions),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const productData = await products.json();
	const attributeData = await fetch('/api/attribute', {
		method: 'POST',
		body: JSON.stringify({ id: category?.id ?? 0 }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { attributes } = await attributeData.json();

	return {
		category: category,
		subCategoryName: subCategoryName,
		subCategoryUrl: rawSubCategoryName,
		productData: productData,
		paginationOptions: paginationOptions,
		attributes: attributes
	};
}) satisfies PageLoad;
