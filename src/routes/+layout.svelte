<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const sendHeight = (height) => {
			if (window.parent !== window) {
				parent.postMessage({ type: 'setHeight', height }, '*');
			}
			// console.log('Sent height:', height);
		};

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const height = entry.contentRect.height;
				sendHeight(height);
			}
		});

		resizeObserver.observe(document.body); // or document.querySelector('main')

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<main>
	{@render children()}
</main>
