<script lang="ts">
	import type { AttributeOption } from '$lib/interfaces/attribute';
	import { createEventDispatcher } from 'svelte';

	export let attribute: AttributeOption;

	const dispatch = createEventDispatcher();

	function removeFilter(attribute: AttributeOption) {
		dispatch('removeFilter', attribute);
	}
</script>

<span
	class="dark:bg-pruple-900 bg-blue-100 text-blue-800 dark:text-blue-300 mr-2 inline-flex items-center rounded px-2 py-1 text-sm font-medium"
>
	{attribute.option}
	<button
		aria-hidden="true"
		class="bg-transparent text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300 ml-2 inline-flex items-center rounded-sm p-0.5 text-sm"
		on:click={() => removeFilter(attribute)}
	>
		<svg
			aria-hidden="true"
			class="h-3.5 w-3.5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/></svg
		>
		<span class="sr-only">Remove Filter Chip</span>
	</button>
</span>
