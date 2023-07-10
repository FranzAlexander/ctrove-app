<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	console.log(data.categories);
</script>

<Header />

<slot />
