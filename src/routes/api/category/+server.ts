import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	const { data, error } = await supabase.from('category').select('id,name, subcategory(id,name)');

	return json({ categories: data });
}
