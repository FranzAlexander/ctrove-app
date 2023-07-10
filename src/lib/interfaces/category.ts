export interface Category {
	id: number;
	name: string;
}

export interface SubCategory {
	id: number;
	name: string;
}

export interface CategoryWithSubCategories extends Category {
	subCategories: SubCategory[];
}

export interface CategoryRequest {
	categoryId: number;
	subcategoryId: number | null;
}
