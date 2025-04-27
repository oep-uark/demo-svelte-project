<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleLinear, scaleBand } from 'd3-scale';

	import AxisX from '$components/AxisX.svelte';
	import AxisY from '$components/AxisY.svelte';
	import DotPlot from '$components/chart_primatives/DotPlot.svelte';

	const data = [
		{ subject: 'Career & Technical', pre: 76, post: 74 },
		{ subject: 'Computer Science', pre: 77, post: 76 },
		{ subject: 'Early Childhood Education', pre: 80, post: 78 },
		{ subject: 'Elementary', pre: 82, post: 80 },
		{ subject: 'Fine Arts', pre: 78, post: 77 },
		{ subject: 'Foreign Language', pre: 77, post: 76 },
		{ subject: 'Middle School ELA', pre: 79, post: 76 },
		{ subject: 'Middle School Math', pre: 80, post: 76 },
		{ subject: 'Middle School Science', pre: 78, post: 75 },
		{ subject: 'Middle School Social Studies', pre: 79, post: 76 },
		{ subject: 'Physical Education & Health', pre: 79, post: 77 },
		{ subject: 'Secondary ELA', pre: 80, post: 77 },
		{ subject: 'Secondary Math', pre: 78, post: 78 },
		{ subject: 'Secondary Science', pre: 79, post: 77 },
		{ subject: 'Secondary Social Studies', pre: 78, post: 78 },
		{ subject: 'Special Education', pre: 77, post: 76 }
	];

	const yKey = 'subject';
	const xKey = Object.keys(data[0]).filter((d) => d !== yKey);

	data.forEach((d) => {
		xKey.forEach((name) => {
			d[name] = +d[name];
		});
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, bottom: 20, top: 20, left: 140 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		xDomain={[70, 85]}
		xPadding={[10, 0]}
		{data}
	>
		<Svg>
			<AxisX ticks={[70, 75, 80, 85]} />
			<AxisY gridlines={true} />
			<DotPlot />
		</Svg>
	</LayerCake>
</div>

<style>
	/*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
	.chart-container {
		width: 100%;
		height: 500px;
	}
</style>
