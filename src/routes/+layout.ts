import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../supabase';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const [session, categories] = await Promise.all([
		supabase.auth.getSession().then((res) => res.data.session),
		fetch('/api/category', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then((res) => res.json())
	]);

	// const mappedData = response.map(({ id, name, subcategory }) => ({
	// 	id,
	// 	name,
	// 	subCategories: subcategory.map(({ id, name }) => ({ id, name }))
	// }));

	return { supabase, session, categories };
}) satisfies LayoutLoad;
