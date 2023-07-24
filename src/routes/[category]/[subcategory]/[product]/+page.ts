import type { ProductRequest } from '$lib/interfaces/product';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const productUrl = params.product.split('-');
	const productModel = productUrl[productUrl.length - 1];

	const product = await fetch('/api/product', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ productModel: productModel } as ProductRequest)
	});

	return { product };
}) satisfies PageLoad;
