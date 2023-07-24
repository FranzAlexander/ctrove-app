export interface Attribute {
	id: number;
	name: string;
}

export interface AttributeOption {
	id: number;
	option: string;
}

export interface AttributeWithOptions extends Attribute {
	options: AttributeOption[];
}
