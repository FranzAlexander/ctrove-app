<script lang="ts">
	import type { AttributeOption, AttributeWithOptions } from '$lib/interfaces/attribute';
	import { createEventDispatcher } from 'svelte';

	export let attributes: AttributeWithOptions[];

	const dispatch = createEventDispatcher();

	function addFilter(attributeOption: AttributeOption) {
		dispatch('addFilter', attributeOption);
	}
</script>

<div class="max-w-sm absolute right-4 z-10 w-60">
	<details class="overflow-hidden rounded border border-gray-300">
		<summary
			class="flex cursor-pointer items-center justify-between gap-2 bg-white p-2 text-gray-900 transition"
		>
			<span class="text-sm font-medium"> Filter </span>
			<span class="transition group-open:-rotate-180">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
			</span>
		</summary>

		<div class="border-t border-gray-200 bg-white">
			<button type="button" class="text-sm text-gray-900 underline underline-offset-4">Reset</button
			>
		</div>

		<ul class="space-y-1 border-t border-gray-200 p-4 bg-white">
			{#each attributes as attribute (attribute.id)}
				<li>
					<span class="">{attribute.name}</span>
					<ul>
						{#each attribute.options as option (option.id)}
							<li class="space-y-1 px-4 py-1">
								<label for={option.option} class="inline-flex items-center gap-2">
									<input
										type="checkbox"
										name={option.option}
										id={option.option}
										class="h-5 w-5 rounded border-gray-300"
										on:change={() => addFilter(option)}
									/>
									<span class="text-sm font-medium text-gray-700">{option.option}</span></label
								>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</details>
</div>
