<script>
	// Sample data
	const data = [
		{ subject: 'Middle School Math', pre: 80, post: 76 },
		{ subject: 'Middle School ELA', pre: 79, post: 76 },
		{ subject: 'Secondary Math', pre: 78, post: 78 },
		{ subject: 'Elementary', pre: 82, post: 80 }
	];

	const width = 700;
	const height = data.length * 40 + 50;

	// Scale functions (could use D3 later)
	const xScale = (val) => 100 + ((val - 70) / 15) * 500;
</script>

<div id="chart-container" class="border-2">
	<svg {width} {height}>
		{#each data as d, i}
			<g transform={`translate(0, ${i * 40 + 40})`}>
				<text x="10" y="5" font-size="12" alignment-baseline="middle">{d.subject}</text>

				<!-- Line -->
				<line x1={xScale(d.pre)} x2={xScale(d.post)} y1="0" y2="0" stroke="gray" stroke-width="2" />

				<!-- Dots -->
				<circle cx={xScale(d.pre)} cy="0" r="5" fill="#f43f5e" />
				<circle cx={xScale(d.post)} cy="0" r="5" fill="#10b981" />

				<!-- Label difference -->
				<text x={xScale(d.pre) - 30} y="5" font-size="12" text-anchor="end" fill="#f43f5e">
					{d.post - d.pre}%
				</text>
			</g>
		{/each}
	</svg>
</div>
