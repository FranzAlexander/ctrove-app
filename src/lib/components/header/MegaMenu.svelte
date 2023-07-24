<script lang="ts">
	import type { Categories, CategoryUrls } from '$lib/interfaces/category';
	import { createEventDispatcher } from 'svelte';

	export let categories: Categories = [];
	export let categoryUrls: CategoryUrls[] = [];

	const dispatch = createEventDispatcher();

	function toggleMenu() {
		dispatch('toggleMegaMenu');
	}
</script>

<div
	class="absolute left-0 w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto"
>
	{#each categories ?? [] as category, i (category.id)}
		<div>
			<ul class="space-y-4">
				<li>
					<a
						href={categoryUrls[i].categoryUrl}
						on:click={toggleMenu}
						class="group flex items-center text-lg text-gray-700 transition-colors duration-200 hover:text-[#a0d8f1]"
					>
						{category.name}
					</a>
					<ul
						class="ml-2 mt-2 space-y-1 max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] overflow-auto"
					>
						{#each category?.subcategory as subCategory, ii (subCategory.id)}
							<a
								href={categoryUrls[i].subCategoryUrls[ii]}
								on:click={toggleMenu}
								class="group flex items-center font-sans text-sm text-gray-600 transition-colors duration-200 hover:text-[#a0d8f1]"
							>
								{subCategory.name}
							</a>
						{/each}
					</ul>
				</li>
			</ul>
		</div>
	{/each}
</div>
