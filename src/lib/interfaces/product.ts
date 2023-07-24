export interface ProductRequest {
	productModel: string;
}

export interface ProductPaginationOptions {
	categoryId: number;
	subcategoryId: number | null;
	offset: number;
	limit: number;
}

export interface ProductCard {
	productSku: string;
	name: string;
	price: number;
	thumbnail: string;
	model: string;
}
