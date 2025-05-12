<script>
	let { data } = $props();

	const cols = 20;
	const rows = 5;
	const totalDots = 100;

	const dotData = $derived.by(() => {
		let result = [];
		let total = data.reduce((sum, d) => sum + Number(d.count), 0);
		let scaled = data.map((d) => ({
			color: d.color,
			label: d.label,
			count: Math.round((Number(d.count) / total) * totalDots)
		}));

		// Adjust for rounding errors
		let currentTotal = scaled.reduce((sum, d) => sum + d.count, 0);
		let diff = totalDots - currentTotal;
		if (diff !== 0) {
			scaled[0].count += diff;
		}

		let current = 0;
		for (const group of scaled) {
			for (let i = 0; i < group.count; i++) {
				const x = current % cols;
				const y = Math.floor(current / cols);
				result.push({ x, y, color: group.color });
				current++;
			}
		}
		return result;
	});
</script>

<svg viewBox="0 0 20 5" class="h-auto w-full max-w-md py-4">
	{#each dotData as { x, y, color } (x + '-' + y)}
		<circle cx={x + 0.5} cy={y + 0.5} r=".4" fill={color} />
	{/each}
</svg>
