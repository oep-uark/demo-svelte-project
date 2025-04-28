<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';

	import { scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';

	import AxisX from '$components/AxisX.svelte';
	import AxisY from '$components/AxisY.svelte';
	import BarStacked from '$components/chart_primatives/BarStacked.svelte';

	import raw from '../data/stacked_bar_retention_data.csv';
	// const filtered = raw.filter((d) => d.period === 'Before COVID');
	const filtered = raw;

	// const seriesNames = Array.from(new Set(filtered.map((d) => d.variable)));
	const seriesNames = ['Stayer', 'Mover', 'Switcher', 'Exiter'];
	const seriesColors = ['#002F70', '#B4C2EB', '#EDB4B5', '#5F1415'];

	const wideMap = new Map();
	filtered.forEach((d) => {
		const group = d.school_year;
		if (!wideMap.has(group)) {
			wideMap.set(group, { school_year: group });
		}
		wideMap.get(group)[d.variable] = +d.value * 100;
	});

	const wide = Array.from(wideMap.values());

	wide.splice(wide.findIndex((d) => d.school_year === '2019-2020') + 1, 0, {
		school_year: ''
	});

	const stackedData = stack(wide, seriesNames);

	const xKey = 'school_year';
	const yKey = [0, 1];
	const zKey = 'key';

	console.log('test');
	const formatLabelY = (d) => d + '%';
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={(d) => d.data[xKey]}
		y={yKey}
		z={zKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		yScale={scaleLinear()}
		xDomainSort={false}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<script>
				import { getContext } from 'svelte';

				const { xScale } = getContext('LayerCake');
			</script>

			<AxisX gridlines={false} />
			<AxisY gridlines={true} format={formatLabelY} />
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
		height: 600px;
	}
</style>
