import type { ProductCard, ProductPaginationOptions } from '$lib/interfaces/product';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../supabase';
import { error } from '@sveltejs/kit';

export async function getProductRange(
	productOptions: ProductPaginationOptions,
	supabase: SupabaseClient<Database, 'public', any>
): Promise<ProductCard[]> {
	const { data, error: productError } = await supabase.rpc('fetch_product_range', {
		p_category_id: productOptions.categoryId,
		p_subcategory_id: productOptions.subcategoryId,
		p_offset: productOptions.offset,
		p_limit: productOptions.limit
	});
	// productOptions.subcategoryId === null
	// 	? await supabase
	// 			.from('product')
	// 			.select('sku,name,price,model,thumbnail')
	// 			.eq('category_id', productOptions.categoryId)
	// 			.range(productOptions.offset, productOptions.limit)
	// 	: await supabase
	// 			.from('product')
	// 			.select('sku,name,price,model,thumbnail')
	// 			.eq('category_id', productOptions.categoryId)
	// 			.eq('subcategory_id', productOptions.subcategoryId)
	// 			.range(productOptions.offset, productOptions.limit);

	if (productError || !data) {
		throw error(400, 'Could not get products');
	}

	return await transformProductCard(data);
}

async function transformProductCard(
	productData: {
		sku: any;
		name: any;
		price: any;
		model: any;
		thumbnail: any;
	}[]
): Promise<ProductCard[]> {
	return productData.map((product) => {
		return {
			productSku: product.sku,
			name: product.name,
			price: product.price,
			model: product.model,
			thumbnail: product.thumbnail
		} as ProductCard;
	});
}
