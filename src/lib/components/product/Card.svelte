<script lang="ts">
	import type { ProductCard } from '$lib/interfaces/product';
	import { generateProductUrl } from '$lib/utils';

	export let product: ProductCard;
	export let categoryUrl: string;

	const productUrl = generateProductUrl(categoryUrl, product.name, product.model);
</script>

<section
	class="mx-auto w-[300px] flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-lg shadow-gray-600 hover:shadow-blue-400 transition-shadow duration-200 ease-in-out"
>
	<figure>
		<a href={productUrl} class="aspect-square">
			<img
				src={product.thumbnail}
				alt={product.name}
				class="bg-gradient-to-bl from-[#a0d8f1] to-[#006666] p-2"
			/>
		</a>
	</figure>
	<div class="px-3 py-2 flex flex-col justify-between gap-2">
		<h1 class="font-heading font-bold text-gray-900 text-lg">
			<a href={productUrl}>{product.name}</a>
		</h1>
		<p class="inline-block font-medium">{product.model}</p>
		<span class="inline-block font-body font-semibold text-gray-900">${product.price}</span>
		<button
			type="button"
			class="text-xm mb-2 rounded-lg bg-[#008080] px-3 py-1 font-body font-semibold text-white hover:bg-[#009999]"
		>
			Add to cart
		</button>
	</div>
</section>

<!-- <section
	class="flex flex-col max-w-sm mx-auto overflow-hidden rounded-lg bg-gray-50 shadow-lg shadow-gray-600 hover:shadow-blue-400"
>
	<figure>
		<a href="" class="aspect-square overflow-hidden">
			<img
				src={product.thumbnail}
				alt={product.name}
				class="bg-gradient-to-bl from-[#a0d8f1] to-[#006666] object-cover w-full h-full p-2"
			/>
		</a>
	</figure>
	<div class="px-3 py-2">
		<h1 class="mb-4 font-heading text-lg font-bold text-gray-900">
			<a href="#">
				{product.name}
			</a>
		</h1>
		<p class="mb-2 w-min rounded-full bg-gray-400 p-1 font-sans text-xs text-gray-900">
			{product.model}
		</p>
		<div class="flex justify-between">
			<span
				class="mb-2 mr-2 inline-block rounded-full px-3 py-1 font-sans font-semibold text-gray-900"
			>
				${product.price}
			</span>

			<button
				type="button"
				class="text-xm mb-2 rounded-lg bg-[#008080] px-3 py-1 font-body font-semibold text-white hover:bg-[#009999]"
			>
				Add to cart
			</button>
		</div>
	</div>
</section> -->
