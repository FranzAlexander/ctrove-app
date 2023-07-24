// Represents a category
export interface Category {
	id: number; // Unique identifier for the category
	name: string; // Name of the category
}

// Represents a subcategory
export interface SubCategory {
	id: number; // Unique identifier for the subcategory
	name: string; // Name of the subcategory
}

// Represents a category with its associated subcategories
export interface CategoryWithSubCategories extends Category {
	subcategory: SubCategory[]; // Array of subcategories belonging to the category
}

// Represents a cached category with its associated subcategories and URLs
export interface CachedCategory extends Category {
	subcategory: SubCategory[]; // Array of subcategories belonging to the category
	urls: CategoryUrls; // URLs associated with the category
}

// Represents a request for category and subcategory information
export interface CategoryRequest {
	categoryId: string; // ID of the requested category
	subcategoryId: string | null; // ID of the requested subcategory, or null if not specified
}

// Represents URLs associated with a category and its subcategories
export interface CategoryUrls {
	id: number; // Unique identifier for the category
	categoryUrl: string; // URL associated with the category
	subCategoryUrls: string[]; // Array of URLs associated with the subcategories
}

export interface CachedCategoriesAndUrls {
	categories: CategoryWithSubCategories[];
	urls: CategoryUrls[];
}

// Array type containing categories with their subcategories
export type Categories = CategoryWithSubCategories[];

// Array type containing all category URLs
export type AllCategoryUrls = CategoryUrls[];

// Array type containing cached categories
export type CachedCategories = CachedCategory[];
