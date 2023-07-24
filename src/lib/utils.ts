import type {
	Categories,
	CategoryUrls,
	CategoryWithSubCategories,
	SubCategory
} from './interfaces/category';

// utils.js
export async function generateUrls(categories: Categories): Promise<CategoryUrls[]> {
	const categoryUrls: CategoryUrls[] = [];
	await Promise.allSettled(
		categories.map(async (category: CategoryWithSubCategories) => {
			const categorySlug = encodeURIComponent(category.name.replace(/\s+/g, '-'));
			const subCategoryUrls: string[] = (
				await Promise.allSettled(
					category.subcategory.map(async (subCategory: SubCategory) => {
						const subCategorySlug = encodeURIComponent(subCategory.name.replace(/\s+/g, '-'));
						return `/${categorySlug}/${subCategorySlug}`;
					})
				)
			)
				.filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
				.map((result) => result.value);
			categoryUrls.push({ id: category.id, categoryUrl: `/${categorySlug}/all`, subCategoryUrls });
		})
	);
	return categoryUrls;
}

export async function generateSubUrls(category: CategoryWithSubCategories): Promise<CategoryUrls> {
	console.log(category);

	const subUrl: string[] = [];
	await Promise.all(
		category.subcategory.map(async (subCategory: SubCategory) => {
			const subCategorySlug = encodeURIComponent(subCategory.name.replace(/\s+/g, '-'));
			const url = `/${encodeURIComponent(category.name.replace(/\s+/g, '-'))}/${subCategorySlug}`;
			subUrl.push(url);
		})
	);

	const categoryUrl: CategoryUrls = {
		id: category.id,
		categoryUrl: `/${encodeURIComponent(category.name.replace(/\s+/g, '-'))}/all`,
		subCategoryUrls: subUrl
	};

	return categoryUrl;
}

export function generateProductUrl(
	categoyUrl: string,
	productName: string,
	productModel: string
): string {
	return `${categoyUrl}/${encodeURIComponent(productName.replace(/\s+/g, '-'))}-${productModel}`;
}
