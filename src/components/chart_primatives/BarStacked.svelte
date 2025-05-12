<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!--
  @component
  Generates an SVG column chart. It uses the z-scale for color assignments and aassumes both `xScale` and `zScale` are ordinal scales.  It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack
 -->
<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { format } from 'd3';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');

	const dispatch = createEventDispatcher();
	let hideTooltip = false;

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			raise(this);
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch('mousemove', { e });
			}
		};
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<g
	class="column-group"
	on:mouseout={(e) => dispatch('mouseout')}
	on:blur={(e) => dispatch('mouseout')}
>
	{#each $data as series, i}
		{#each series as d}
			{@const yVals = $yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}

			{#if d.data.school_year !== ''}
				<rect
					class="group-rect"
					data-id={i}
					x={$xGet(d)}
					y={yVals[1]}
					width={$xScale.bandwidth()}
					height={columnHeight}
					fill={$zGet(series)}
					on:mouseover={(e) => {
						dispatch('mousemove', { e, props: { ...d, key: series.key } });
					}}
					on:focus={(e) => dispatch('mousemove', { e, props: { ...d, key: series.key } })}
					on:mousemove={(e) => handleMousemove(e, { ...d, key: series.key })}
					role="tooltip"
				></rect>

				<text
					x={$xGet(d) + $xScale.bandwidth() / 2}
					y={($yGet(d)[0] + $yGet(d)[1]) / 2}
					text-anchor="middle"
					dominant-baseline="middle"
					font-size="10"
					fill="white"
					style="pointer-events: none"
				>
					{format('.1f')(d.data[series.key])}%
				</text>
			{/if}
		{/each}
	{/each}
</g>
