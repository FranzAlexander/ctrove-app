export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
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
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
