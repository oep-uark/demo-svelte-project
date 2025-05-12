<script>
	let { data } = $props();

	const cols = 20;
	const maxDots = 100;

	const total = $derived.by(() => data.reduce((sum, d) => sum + Number(d.count), 0));

	const rows = $derived.by(() => Math.ceil(Math.min(total, maxDots) / cols));

	const dotData = $derived.by(() => {
		const showActual = total <= maxDots;
		const scaleTotal = showActual ? total : maxDots;

		let scaled = showActual
			? data.map((d) => ({
					...d,
					count: Number(d.count)
				}))
			: data.map((d) => ({
					...d,
					count: Math.round((Number(d.count) / total) * maxDots)
				}));

		// Adjust for rounding mismatch
		let scaledTotal = scaled.reduce((sum, d) => sum + d.count, 0);
		let diff = scaleTotal - scaledTotal;
		if (diff !== 0 && scaled.length > 0) {
			scaled[0].count += diff;
		}

		let dots = [];
		let current = 0;
		for (const group of scaled) {
			for (let i = 0; i < group.count; i++) {
				const x = current % cols;
				const y = Math.floor(current / cols);
				dots.push({ x, y, color: group.color });
				current++;
			}
		}
		return dots;
	});
</script>

<svg viewBox={`0 0 ${cols} ${rows}`} class="h-auto max-h-40 w-full">
	{#each dotData as { x, y, color } (x + '-' + y)}
		<circle cx={x + 0.5} cy={y + 0.5} r="0.48" fill={color} />
	{/each}
</svg>
