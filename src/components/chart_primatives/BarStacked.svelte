<!--
  @component
  Generates an SVG column chart. It uses the z-scale for color assignments and aassumes both `xScale` and `zScale` are ordinal scales.  It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack
 -->
<script>
	import { getContext } from 'svelte';
	import { format } from 'd3';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');
</script>

<g class="column-group">
	{#each $data as series, i}
		{#each series as d}
			{@const yVals = $yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}

			{#if d.data.school_year !== 'SPACER'}
				<rect
					class="group-rect"
					data-id={i}
					x={$xGet(d)}
					y={yVals[1]}
					width={$xScale.bandwidth()}
					height={columnHeight}
					fill={$zGet(series)}
				></rect>

				<text
					x={$xGet(d) + $xScale.bandwidth() / 2}
					y={($yGet(d)[0] + $yGet(d)[1]) / 2}
					text-anchor="middle"
					dominant-baseline="middle"
					font-size="10"
					fill="white"
				>
					{format('.1f')(d.data[series.key])}%
				</text>
			{/if}
		{/each}
	{/each}
</g>
