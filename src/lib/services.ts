import type { ProductCard, ProductPaginationOptions } from './interfaces/product';

export async function getProductPagination(
	paginationOptions: ProductPaginationOptions
): Promise<ProductCard[]> {
	const response = await fetch('/api/product', {
		method: 'POST',
		body: JSON.stringify(paginationOptions),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return response.json() as Promise<ProductCard[]>;
}
