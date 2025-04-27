<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import AxisX from '$components/AxisX.svelte';
	import AxisY from '$components/AxisY.svelte';
	import BarStacked from '$components/chart_primatives/BarStacked.svelte';

	import raw from '../data/stacked_bar_retention_data.csv';
	const filtered = raw.filter((d) => d.period === 'Before COVID');

	const seriesNames = Array.from(new Set(filtered.map((d) => d.variable)));
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const wideMap = new Map();
	filtered.forEach((d) => {
		const group = d.school_year;
		if (!wideMap.has(group)) {
			wideMap.set(group, { school_year: group });
		}
		wideMap.get(group)[d.variable] = +d.value;
	});

	const wide = Array.from(wideMap.values());
	const stackedData = stack(wide, seriesNames);

	const xKey = [0, 1];
	const yKey = 'school_year';
	const zKey = 'key';

	console.log('test');
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, bottom: 20, left: 35 }}
		x={xKey}
		y={(d) => d.data[yKey]}
		z={zKey}
		yScale={scaleBand().paddingInner(0.05)}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX baseline snapLabels />
			<AxisY gridlines={false} />
			<BarStacked />
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
		height: 250px;
	}
</style>
