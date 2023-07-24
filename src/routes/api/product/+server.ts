import type { CategoryRequest } from '$lib/interfaces/category.js';
import type { ProductCard } from '$lib/interfaces/product.js';
import { getProductRange } from '$lib/server/productHandler.js';
import { isProductPaginationOptions, isProductPayload } from '$lib/server/typecheck.js';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
	const requestData = await request.json();

	if (isProductPayload(requestData)) {
		const { data } = await supabase
			.from('product')
			.select('*')
			.eq('model', requestData.productModel);

		return json(data);
	}

	if (isProductPaginationOptions(requestData)) {
		try {
			return json(await getProductRange(requestData, supabase));
		} catch (catchError) {
			throw error(400, 'Unable to get products');
		}
	}

	return json('');
}
