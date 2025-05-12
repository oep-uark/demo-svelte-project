<!--
  @component
  Adds text annotations that get their x and y placement using the `xScale` and `yScale`.
  Modified from base annotations data to work with stacked bar chart. 
 -->
<script>
	import { getContext } from 'svelte';

	const { xGet, yGet, percentRange } = getContext('LayerCake');

	/** @type {Array} annotations - A list of annotation objects. */
	export let annotations = [];

	/** @type {Function} [getText=d => d.text] - An accessor function to get the field to display. */
	export let getText = (d) => d.text;

	/** @type {boolean} [percentRange=false] - If `true` will set the `top` and `left` CSS positions to percentages instead of pixels. */
	export let pr = $percentRange;

	$: units = pr === true ? '%' : 'px';

	$: {
		annotations.forEach((a) => {
			console.log('yGet', $yGet(a));
		});
	}
</script>

<div class="layercake-annotations">
	{#each annotations as d, i}
		<!-- style:left={`calc(${$xGet(d)})`} -->
		{console.log($yGet(d))}
		<!-- <div class="layercake-annotation" data-id={i}>
			{getText(d)}
		</div> -->
		<!-- <div
			class="layercake-annotation"
			data-id={i}
			style:left={`calc(${$xGet(d)}${units} + ${d.dx || 0}px)`}
			style:top={0.5}
		> -->
		<!-- style:top={`calc(${$yGet(d)}${units} + ${d.dy || 0}px)`} -->
		<div
			class="layercake-annotation"
			data-id={i}
			style="
				left: {`calc(${$xGet(d)}${units} + ${d.dx || 0}px)`};
				top: calc(100% + {d.dy || 0}px);
				transform: translate(${d.dx || 0}px, ${d.dy || 0}px);
			"
		>
			{getText(d)}
		</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>
