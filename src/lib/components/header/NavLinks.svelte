<script lang="ts">
	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>

<button
	type="button"
	class="font-medium text-gray-900 hover:text-blue-600 focus:outline-none"
	on:click={toggleMenu}
	>Products <svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-5 w-5 ml-1 inline"
		fill="currentColor"
		viewBox="0 0 20 20"
		aria-hidden="true"
	>
		<path
			fill-rule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clip-rule="evenodd"
		/>
	</svg>
</button>
