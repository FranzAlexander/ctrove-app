import type { AttributeWithOptions } from '$lib/interfaces/attribute.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
	const requestData = (await request.json()) as { id: number };

	const { data } = await supabase.rpc('get_attributes_by_category', {
		p_category_id: requestData.id
	});

	const mappedAttributes: AttributeWithOptions[] = data.map((attribute: any) => ({
		id: attribute.attribute_id,
		name: attribute.attribute_name,
		options: attribute.options
	}));

	return json({ attributes: mappedAttributes });
}
