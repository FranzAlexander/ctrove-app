<script lang="ts">
	import Filter from '$lib/components/attribute/Filter.svelte';
	import FilterChip from '$lib/components/attribute/FilterChip.svelte';
	import Card from '$lib/components/product/Card.svelte';
	import Paginiation from '$lib/components/product/Paginiation.svelte';
	import type { AttributeOption, AttributeWithOptions } from '$lib/interfaces/attribute';
	import type { ProductCard } from '$lib/interfaces/product';
	import { getProductPagination } from '$lib/services';
	import type { PageData } from './$types';

	export let data: PageData;

	const itemsPerPage = 6;

	const category = data?.category;

	let attributeFilters: AttributeOption[] = [];
	$: currentSub = data?.subCategoryName;
	$: currentSubUrl = data?.subCategoryUrl;
	$: productData = data?.productData as ProductCard[];
	let currentPageOptions = data?.paginationOptions;
	let currentPageNumber = 1;

	function addFilter(event: CustomEvent<AttributeOption>) {
		attributeFilters = [...attributeFilters, event.detail];
	}

	function removeFilter(event: CustomEvent<AttributeOption>) {
		console.log(attributeFilters);
		attributeFilters = attributeFilters.filter((value) => value.id !== event.detail.id);
	}

	async function nextPage() {
		currentPageNumber += 1;
		currentPageOptions.offset = currentPageNumber * itemsPerPage;
		currentPageOptions.limit = currentPageOptions.offset + itemsPerPage;
		productData = await getProductPagination(currentPageOptions);
	}

	async function prevPage() {
		currentPageNumber -= 1;
		currentPageOptions.offset = currentPageNumber * itemsPerPage;
		currentPageOptions.limit = currentPageOptions.offset + itemsPerPage;
		productData = await getProductPagination(currentPageOptions);
	}
</script>

<section>
	<header>
		<div class="flex justify-between">
			<h1
				class="block p-2 font-heading text-2xl font-semibold tracking-tight text-gray-900"
				aria-label="Category Name"
			>
				{category.name}
			</h1>
			<div>
				{#each attributeFilters as filter (filter.id)}
					<FilterChip attribute={filter} on:removeFilter={removeFilter} />
				{/each}
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex flex-wrap overflow-auto scrollbar-hide">
				<a
					href={category.urls.categoryUrl}
					class="ml-4 px-4 py-2 font-body transition duration-200 ease-in-out {currentSub === 'all'
						? 'border-b border-blue-600'
						: 'hover:rounded-lg hover:bg-gray-100 hover:shadow-md'}">All</a
				>
				{#each category.subcategory as subcategory, index (subcategory.id)}
					<a
						href={category.urls.subCategoryUrls[index]}
						class="ml-4 px-4 py-2 font-body transition duration-200 ease-in-out {currentSub ===
						subcategory.name
							? 'border-b border-blue-600'
							: 'hover:rounded-lg hover:bg-gray-100 hover:shadow-md'}">{subcategory.name}</a
					>
				{/each}
			</div>
			{#if data?.attributes !== undefined}
				<Filter attributes={data?.attributes} on:addFilter={addFilter} />
			{/if}
		</div>
	</header>
	<Paginiation />
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 px-4 py-6 sm:px-6 lg:px-8 auto-rows-fr"
	>
		{#each productData as product (product.productSku)}
			<Card {product} categoryUrl={currentSubUrl} />
		{/each}
	</div>

	<div class="flex justify-between">
		<button
			type="button"
			on:click={prevPage}
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 fill-white">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/>
			</svg>
		</button>
		<button
			type="button"
			on:click={nextPage}
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 fill-white">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
				/>
			</svg>
		</button>
	</div>
</section>
