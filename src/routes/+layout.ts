import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../supabase';
import type { LayoutLoad } from './$types';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Categories } from '$lib/interfaces/category';
import { generateUrls } from '$lib/utils';

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
		})
			.then((res) => res.json())
			.then((data) => data)
	]);

	return {
		supabase,
		session,
		categories: categories.categories as Categories,
		categoryUrls: categories.categoryUrls
	};
}) satisfies LayoutLoad;
