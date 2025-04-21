<!--
  @component
  Generates an SVG Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, yScale, config } = getContext('LayerCake');

	/** @type {Number} [r=5] - The circle radius. */
	export let r = 3;

	$: midHeight = $yScale.bandwidth() / 2;

	const deltaColorMap = {
		0: '#3b82f6',
		'-1': '#10b981',
		'-2': '#facc15',
		'-3': '#f97316',
		'-4': '#ef4444'
	};

	function getDeltaColor(delta) {
		return deltaColorMap[delta] || '#9ca3af';
	}
</script>

<g class="dot-plot">
	{#each $data as row}
		{@const yVal = $yGet(row)}
		{@const xVals = $xGet(row)}
		<g class="dot-row">
			<text
				x={Math.min(...xVals) - 10}
				y={yVal + midHeight}
				text-anchor="end"
				alignment-baseline="middle"
				font-size="12"
				class="change-label"
				stroke={getDeltaColor(row.post - row.pre)}
			>
				{row.post - row.pre}%
			</text>

			<line
				x1={Math.min(...xVals)}
				y1={yVal + midHeight}
				x2={Math.max(...xVals)}
				y2={yVal + midHeight}
				stroke={getDeltaColor(row.post - row.pre)}
			></line>

			<circle
				cx={xVals[0]}
				cy={yVal + midHeight}
				{r}
				class="pre"
				fill={getDeltaColor(row.post - row.pre)}
				stroke={getDeltaColor(row.post - row.pre)}
			></circle>

			<!-- Post value (arrow) -->
			<polygon
				points={`
                    ${xVals[1] + r + 1},${yVal + midHeight - r - 1}
                    ${xVals[1] + r + 1},${yVal + midHeight + r + 1}
                    ${xVals[1] - r - 1},${yVal + midHeight}
                `}
				class="post"
				fill={getDeltaColor(row.post - row.pre)}
			/>
		</g>
	{/each}
</g>

<style>
	line {
		stroke-width: 1px;
	}
	circle {
		stroke-width: 1px;
	}
</style>
