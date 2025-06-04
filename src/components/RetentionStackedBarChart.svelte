<script>
	import { LayerCake, Svg, flatten, stack, Html } from 'layercake';

	import { scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';
	import { onMount } from 'svelte';

	import AxisX from '$components/AxisX.svelte';
	import AxisY from '$components/AxisY.svelte';
	import BarStacked from '$components/chart_primatives/BarStacked.svelte';
	import Annotations from '$components/AnnotationsDataStacked.html.svelte';
	import Tooltip from '$components/Tooltip.html.svelte';

	import raw from '../data/stacked_bar_retention_data.csv';

	const seriesNames = ['Stayer', 'Mover', 'Switcher', 'Exiter'];
	const seriesColors = ['#002F70', '#B4C2EB', '#EDB4B5', '#5F1415'];

	const wideMap = new Map();
	raw.forEach((d) => {
		const group = d.school_year;
		if (!wideMap.has(group)) {
			wideMap.set(group, { school_year: group });
		}
		wideMap.get(group)[d.variable] = +d.value * 100;
	});

	const wide = Array.from(wideMap.values());

	wide.splice(wide.findIndex((d) => d.school_year === '2019-20') + 1, 0, {
		school_year: ''
	});

	const stackedData = stack(wide, seriesNames);

	const xKey = 'school_year';
	const yKey = [0, 1];
	const zKey = 'key';

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
	const formatLabelY = (d) => d + '%';

	const annotations = [
		{
			text: 'Before COVID',
			dx: 0,
			dy: -660,
			data: { school_year: '2017-18' },
			align: 'center'
		},
		{
			text: 'After COVID',
			dx: 0,
			dy: -660,
			data: { school_year: '2022-23' },
			align: 'center'
		}
	];

	let evt;
	let hideTooltip = false;

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
		padding={{ top: 20, right: 0, bottom: 20, left: 20 }}
		x={(d) => d.data[xKey]}
		y={yKey}
		z={zKey}
		xScale={scaleBand().paddingInner(0.05).round(true)}
		xDomain={[
			// '2014-15',
			'2015-16',
			'2016-17',
			'2017-18',
			'2018-19',
			'2019-20',
			'',
			'2020-21',
			'2021-22',
			'2022-23',
			'2023-24',
			'2024-25'
		]}
		yScale={scaleLinear()}
		xDomainSort={false}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX gridlines={false} format={formatLabelX} />
			<AxisY gridlines={true} format={formatLabelY} />
			<BarStacked
				on:mousemove={(event) => (evt = hideTooltip = event)}
				on:mouseout={() => (hideTooltip = true)}
			/>
		</Svg>

		<Html pointerEvents={false}>
			{#if hideTooltip !== true}
				<Tooltip {evt} let:detail>
					{@const tooltipData = { ...detail.props }}
					{@const datum = detail.props}
					{@const year = datum.data.school_year}
					{@const variable = datum.key}

					{@const match = raw.find((r) => r.school_year === year && r.variable === variable)}
					{@const tooltipLines = match?.tooltip?.split('\n') || []}

					<div>
						<div class="font-semibold">
							{variable} <span class="text-gray-500">({year})</span>
						</div>

						<ul class="list-inside list-disc text-gray-800">
							{#each tooltipLines as line}
								<li>{line.trim()}</li>
							{/each}
						</ul>
					</div>
				</Tooltip>
			{/if}
		</Html>

		<Html pointerEvents={false}>
			<Annotations {annotations} />
		</Html>
	</LayerCake>
</div>
<div class="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-800">
	{#each seriesNames as name, i}
		<div class="flex items-center gap-1">
			<span class="inline-block h-4 w-4 rounded-sm" style="background-color: {seriesColors[i]}"
			></span>
			<span>{name}</span>
		</div>
	{/each}
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
		height: 675px;
	}
</style>
