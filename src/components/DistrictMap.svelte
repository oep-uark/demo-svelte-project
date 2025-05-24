<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleThreshold, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import MapInteractiveSvg from '$components/chart_primatives/MapInteractive.svg.svelte';
	import Tooltip from '$components/Tooltip.html.svelte';
	import WaffleCircleChart from '$components/WaffleCircleChart.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import districts from '../data/districts.json';
	import flowData from '../data/district_flow_data.json';

	const colorKey = 'retention_rate';

	/* --------------------------------------------
	 * Create lookups to more easily join our data
	 * `dataJoinKey` is the name of the field in the data
	 * `mapJoinKey` is the name of the field in the map file
	 */
	const dataJoinKey = 'districtlea';
	const mapJoinKey = 'lea';
	const dataLookup = new Map();

	const geojson = feature(districts, districts.objects.PUB_SCHOOL_DISTRICTS);
	geojson.features = geojson.features.filter(
		(f) => f.geometry && f.geometry.coordinates && f.geometry.coordinates.length > 0
	);
	const projection = geoIdentity;

	flowData.forEach((d) => {
		d.stayers = +d.stayers;
		d.teachers_2024 = +d.teachers_2024;
		d.teachers_2025 = +d.teachers_2025;
		d.net_change = d.teachers_2025 - d.teachers_2024;

		d.retention_rate = d.stayers / d.teachers_2024;

		dataLookup.set(d[dataJoinKey], d);
	});

	let evt = $state(null);
	let hideTooltip = $state(true);

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map((d) => d.properties);

	const addCommas = format(',');
	const formatPercent = format('.1%');
	const formatRoundPercent = format('.0%');

	// handle the interactivity
	let selectedDistrict = $state(null);
	function handleDistrictClick(districtData) {
		// merges on the actual data again since it's not available from the click event
		selectedDistrict = {
			...districtData,
			...dataLookup.get(districtData[mapJoinKey])
		};
	}
	$inspect(selectedDistrict).with((type, value) => {});
</script>

<div class="flex flex-col gap-4 md:flex-row">
	<div class="chart-container flex-1">
		<LayerCake
			data={geojson}
			z={(d) => dataLookup.get(d[mapJoinKey])[colorKey]}
			zScale={scaleThreshold()}
			zDomain={[0.65, 0.7, 0.75, 0.8, 0.85, 0.9]}
			zRange={['#FFDF43', '#84D24C', '#00B675', '#00908A', '#016587', '#2C376E', '#460049']}
			{flatData}
		>
			<Svg>
				<MapInteractiveSvg
					{projection}
					{selectedDistrict}
					stroke="#020617"
					on:mousemove={(event) => (evt = hideTooltip = event)}
					on:mouseout={() => (hideTooltip = true)}
					on:click={(e) => handleDistrictClick(e.detail)}
				/>
			</Svg>

			<Html pointerEvents={false}>
				{#if hideTooltip !== true}
					<Tooltip {evt} let:detail>
						<!-- For the tooltip, do another data join because the hover event only has the data from the geography data -->
						{@const tooltipData = { ...detail.props, ...dataLookup.get(detail.props[mapJoinKey]) }}
						{@const districtName = tooltipData['District Name'].replace(' School District', '')}
						<div>
							{districtName} retained {formatPercent(tooltipData.retention_rate)} of teachers from 2024
							to 2025.
						</div>
					</Tooltip>
				{/if}
			</Html>
		</LayerCake>
	</div>

	<div class="max-h-[400px] min-h-[240px] w-full rounded p-4 md:w-80">
		{#if selectedDistrict}
			<h2 class="text-lg font-semibold">
				{selectedDistrict?.['District Name']?.replace(' School District', '')}
			</h2>
			<p class="mt-2">
				<strong>Teachers 2024:</strong>
				{addCommas(selectedDistrict?.teachers_2024)}
			</p>
			<p><strong>Teachers 2025:</strong> {addCommas(selectedDistrict?.teachers_2025)}</p>
			<p>
				<strong>Net Change:</strong>
				{#if selectedDistrict?.net_change > 0}
					<span class="text-green-600">+{selectedDistrict.net_change}</span>
				{:else if selectedDistrict?.net_change < 0}
					<span class="text-red-600">{selectedDistrict.net_change}</span>
				{:else}
					<span class="text-gray-600">0</span>
				{/if}
			</p>

			<p class="mt-2 text-sm leading-relaxed text-gray-800">
				Out of <span class="font-semibold text-gray-900"
					>{addCommas(selectedDistrict?.teachers_2024)}</span
				>
				teachers in 2024,
				<span class="font-semibold text-green-600">{addCommas(selectedDistrict?.stayers)}</span>
				stayed for 2025, a retention rate of
				<span class="font-semibold text-green-600"
					>{formatPercent(selectedDistrict?.retention_rate)}</span
				>. Of the remainder:
			</p>
			<ul class="mt-2 mb-4 list-inside list-disc space-y-1 text-sm">
				<li class="font-semibold text-blue-600">
					{addCommas(selectedDistrict?.movers_out)} ({formatRoundPercent(
						+selectedDistrict?.movers_out / +selectedDistrict?.teachers_2024
					)}) moved to other schools
				</li>
				<li class="font-semibold text-yellow-600">
					{addCommas(selectedDistrict?.switchers)}
					({formatRoundPercent(+selectedDistrict?.switchers / +selectedDistrict?.teachers_2024)})
					switched to non-teaching roles
				</li>
				<li class="font-semibold text-red-600">
					{addCommas(+selectedDistrict?.exiters + +selectedDistrict?.retirements)}
					({formatRoundPercent(
						(+selectedDistrict?.exiters + +selectedDistrict?.retirements) /
							+selectedDistrict?.teachers_2024
					)}) exited the teaching workforce
				</li>
			</ul>

			<WaffleCircleChart
				data={[
					{ label: 'Stayers', count: selectedDistrict?.stayers ?? 0, color: '#16a34a' },
					{ label: 'Movers Out', count: selectedDistrict?.movers_out ?? 0, color: '#2563eb' },
					{ label: 'Switchers', count: selectedDistrict?.switchers ?? 0, color: '#eab308' },
					{
						label: 'Exiters',
						count: (+selectedDistrict?.exiters ?? 0) + (+selectedDistrict?.retirements ?? 0),
						color: '#dc2626'
					}
				]}
			/>
		{:else}
			<p class="text-gray-500 italic">Select a district to see its details.</p>
		{/if}
	</div>
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
		height: 400px;
	}
</style>
