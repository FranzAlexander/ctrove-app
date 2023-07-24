import type { ProductPaginationOptions, ProductRequest } from '$lib/interfaces/product';

export function isProductPayload(payload: any): payload is ProductRequest {
	if (typeof payload === 'object' && payload !== null) {
		const { productModel } = payload as ProductRequest;
		return typeof productModel === 'string';
	}
	return false;
}

export function isProductPaginationOptions(payload: any): payload is ProductPaginationOptions {
	if (typeof payload === 'object' && payload !== null) {
		const { categoryId, subcategoryId, offset, limit } = payload as ProductPaginationOptions;
		return (
			typeof categoryId === 'number' &&
			(typeof subcategoryId === 'number' || subcategoryId === null) &&
			typeof offset === 'number' &&
			typeof limit === 'number'
		);
	}

	return false;
}
