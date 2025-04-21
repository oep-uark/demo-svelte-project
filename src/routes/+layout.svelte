<script>
	import '../app.css';

	let { children } = $props();
</script>

<main class="mx-auto py-16 px-4 max-w-3xl">
	{@render children()}
</main>
