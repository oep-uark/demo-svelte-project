<!--
  @component
  Adds text annotations that get their x and y placement using the `xScale` and `yScale`.
  Modified from base annotations data to work with stacked bar chart. 
 -->
<script>
	import { getContext } from 'svelte';

	const { xGet, yGet, percentRange, xScale } = getContext('LayerCake');

	/** @type {Array} annotations - A list of annotation objects. */
	export let annotations = [];

	/** @type {Function} [getText=d => d.text] - An accessor function to get the field to display. */
	export let getText = (d) => d.text;

	/** @type {boolean} [percentRange=false] - If `true` will set the `top` and `left` CSS positions to percentages instead of pixels. */
	export let pr = $percentRange;

	$: units = pr === true ? '%' : 'px';
</script>

<!-- 				transform: translate(${d.dx || 0}px, ${d.dy || 0}px);
 -->

<!-- + ${$xScale.bandwidth()}${units} / 2  -->

<!-- 				left: {`calc(${$xGet(d)}${units} + ${d.dx || 0}px)`};
 -->

<div class="layercake-annotations">
	{#each annotations as d, i}
		<div
			class="layercake-annotation"
			data-id={i}
			style="
				top: calc(100% + {d.dy || 0}px);
				transform: translateX(-50%); /* center horizontally */
				left: {d.align === 'center'
				? `calc(${$xGet(d)}${units} + ${$xScale.bandwidth()}${units} / 2)`
				: `${$xGet(d)}${units}`};
			"
		>
			{getText(d)}
		</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
		white-space: nowrap !important;
	}
</style>
