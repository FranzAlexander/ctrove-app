export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			attribute: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
				Relationships: [];
			};
			attribute_option: {
				Row: {
					attribute_id: number | null;
					id: number;
					option: string | null;
				};
				Insert: {
					attribute_id?: number | null;
					id?: number;
					option?: string | null;
				};
				Update: {
					attribute_id?: number | null;
					id?: number;
					option?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'attribute_option_attribute_id_fkey';
						columns: ['attribute_id'];
						referencedRelation: 'attribute';
						referencedColumns: ['id'];
					}
				];
			};
			brand: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
				Relationships: [];
			};
			category: {
				Row: {
					id: number;
					image: string | null;
					name: string | null;
				};
				Insert: {
					id?: number;
					image?: string | null;
					name?: string | null;
				};
				Update: {
					id?: number;
					image?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			category_attribute: {
				Row: {
					attribute_id: number;
					category_id: number;
				};
				Insert: {
					attribute_id: number;
					category_id?: number;
				};
				Update: {
					attribute_id?: number;
					category_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'category_attribute_attribute_id_fkey';
						columns: ['attribute_id'];
						referencedRelation: 'attribute';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'category_attribute_category_id_fkey';
						columns: ['category_id'];
						referencedRelation: 'category';
						referencedColumns: ['id'];
					}
				];
			};
			category_subcategory: {
				Row: {
					category_id: number;
					subcategory_id: number;
				};
				Insert: {
					category_id?: number;
					subcategory_id: number;
				};
				Update: {
					category_id?: number;
					subcategory_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'category_subcategory_category_id_fkey';
						columns: ['category_id'];
						referencedRelation: 'category';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'category_subcategory_subcategory_id_fkey';
						columns: ['subcategory_id'];
						referencedRelation: 'subcategory';
						referencedColumns: ['id'];
					}
				];
			};
			product: {
				Row: {
					brand_id: number | null;
					category_id: number | null;
					created_at: string | null;
					description: string | null;
					featured: boolean;
					images: string[] | null;
					model: string | null;
					name: string | null;
					price: number | null;
					release_date: string | null;
					sku: string;
					status: string | null;
					stripe_product_id: string | null;
					subcategory_id: number | null;
					thumbnail: string | null;
					updated_at: string | null;
					warranty: string | null;
				};
				Insert: {
					brand_id?: number | null;
					category_id?: number | null;
					created_at?: string | null;
					description?: string | null;
					featured?: boolean;
					images?: string[] | null;
					model?: string | null;
					name?: string | null;
					price?: number | null;
					release_date?: string | null;
					sku: string;
					status?: string | null;
					stripe_product_id?: string | null;
					subcategory_id?: number | null;
					thumbnail?: string | null;
					updated_at?: string | null;
					warranty?: string | null;
				};
				Update: {
					brand_id?: number | null;
					category_id?: number | null;
					created_at?: string | null;
					description?: string | null;
					featured?: boolean;
					images?: string[] | null;
					model?: string | null;
					name?: string | null;
					price?: number | null;
					release_date?: string | null;
					sku?: string;
					status?: string | null;
					stripe_product_id?: string | null;
					subcategory_id?: number | null;
					thumbnail?: string | null;
					updated_at?: string | null;
					warranty?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'product_brand_id_fkey';
						columns: ['brand_id'];
						referencedRelation: 'brand';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_category_id_fkey';
						columns: ['category_id'];
						referencedRelation: 'category';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_subcategory_id_fkey';
						columns: ['subcategory_id'];
						referencedRelation: 'subcategory';
						referencedColumns: ['id'];
					}
				];
			};
			subcategory: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			fetch_product_range: {
				Args: {
					p_category_id: number;
					p_subcategory_id: number | null;
					p_offset: number;
					p_limit: number;
				};
				Returns: {
					sku: string;
					name: string;
					price: number;
					model: string;
					thumbnail: string;
				}[];
			};
			get_attributes_by_category: {
				Args: {
					p_category_id: number;
				};
				Returns: {
					attribute_id: number;
					attribute_name: string;
					options: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
