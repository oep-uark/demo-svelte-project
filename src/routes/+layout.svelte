<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const sendHeight = () => {
			const height = document.documentElement.scrollHeight;
			if (window.parent !== window) {
				parent.postMessage({ type: 'setHeight', height }, '*');
			}
			console.log(height);
		};

		// send once on mount
		sendHeight();

		// send again on resize
		window.addEventListener('resize', sendHeight);

		// watch for DOM changes too
		const observer = new MutationObserver(sendHeight);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			window.removeEventListener('resize', sendHeight);
			observer.disconnect();
		};
	});
</script>

<main>
	{@render children()}
</main>
