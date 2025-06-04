<script>
	import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';

	import { scalePoint, scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format } from 'd3-format';
	import { onMount } from 'svelte';

	import MultiLine from '$components/chart_primatives/MultiLine.svelte';
	import SharedTooltip from '$components/chart_primatives/SharedTooltip.html.svelte';
	import Annotations from '$components/chart_primatives/AnnotationsData.html.svelte';

	import AxisX from '$components/AxisX.svelte';
	import AxisY from '$components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../data/exit_retire_formatted.csv';

	/* --------------------------------------------
	 * Set what is our x key to separate it from the other series
	 */
	const xKey = 'year';
	const yKey = 'value';
	const zKey = 'exit_reason';

	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['#ca2b2d', '#d6a840'];

	/* --------------------------------------------
	 * Cast values
	 */
	data.forEach((d) => {
		seriesNames.forEach((name) => {
			d[name] = +d[name];
		});
	});

	$: formatLabelX = (d) => {
		if (d != '' && isSmallScreen) {
			const [start, end] = d.split('-');
			return `'${end}`;
		}
		if (d != '' && isMedScreen) {
			const [start, end] = d.split('-');
			return `${start.slice(2)}-${end}`;
		}
		return d;
	};
	const formatTooltipTitle = (d) => d;
	const formatTooltipKey = (d) => {
		if (d === 'exit') return 'Exit rate';
		if (d === 'retire') return 'Retirement rate';
		return d;
	};
	const formatTooltipValue = (d) => d + '%';
	const formatLabelY = (d) => d + '%';

	const groupedData = groupLonger(data, seriesNames, {
		groupTo: zKey,
		valueTo: yKey
	});

	const annotations = [
		// {
		// 	text: 'Retirements were 2.8% in 2024-25',
		// 	[xKey]: '2022-23',
		// 	[yKey]: 2,
		// 	dx: 30
		// }
	];

	// handle small screen
	let isSmallScreen = false;
	let isMedScreen = false;

	const updateScreenSize = () => {
		isSmallScreen = window.innerWidth < 640;
		isMedScreen = window.innerWidth >= 640 && window.innerWidth < 768;
	};

	onMount(() => {
		updateScreenSize();
		window.addEventListener('resize', updateScreenSize);
		return () => window.removeEventListener('resize', updateScreenSize);
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 7, right: 10, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		z={zKey}
		xScale={scalePoint().padding(0.5)}
		xDomain={[
			// '2014-15',
			'2015-16',
			'2016-17',
			'2017-18',
			'2018-19',
			'2019-20',
			'2020-21',
			'2021-22',
			'2022-23',
			'2023-24',
			'2024-25'
		]}
		xDomainSort={false}
		yDomain={[0, 8]}
		zScale={scaleOrdinal()}
		zRange={seriesColors}
		flatData={flatten(groupedData, 'values')}
		data={groupedData}
	>
		<Svg>
			<AxisX gridlines={false} tickMarks format={formatLabelX} />
			<AxisY ticks={4} format={formatLabelY} />
			<MultiLine />
		</Svg>

		<Html>
			<!-- <Labels /> -->
			<Annotations {annotations} />
			<SharedTooltip
				formatTitle={formatTooltipTitle}
				formatKey={formatTooltipKey}
				formatValue={formatTooltipValue}
				dataset={data}
			/>
		</Html>
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
