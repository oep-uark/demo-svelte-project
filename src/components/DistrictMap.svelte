<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleThreshold, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import MapSvg from '$components/chart_primatives/Map.svg.svelte';
	import Tooltip from '$components/Tooltip.html.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import districts from '../data/districts.json';
	import flowData from '../data/district_flow_data.json';

	const colorKey = 'net_change';

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
		d.teachers_2024 = +d.teachers_2024;
		d.teachers_2025 = +d.teachers_2025;
		d.net_change = d.teachers_2025 - d.teachers_2024;

		dataLookup.set(d[dataJoinKey], d);
	});

	let evt;
	let hideTooltip = true;

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map((d) => d.properties);

	const addCommas = format(',');

	// handle the interactivity
	let selectedDistrict = $state(null);
	function handleDistrictClick(districtData) {
		console.log('CLICKED');

		selectedDistrict = districtData;
	}
	$inspect(selectedDistrict).with((type, value) => {
		console.log('selectedDistrict changed:', value);
	});
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={(d) => dataLookup.get(d[mapJoinKey])[colorKey]}
		zScale={scaleThreshold()}
		zDomain={[-0.5, 0.5]}
		zRange={['red', 'yellow', 'green']}
		{flatData}
	>
		<Svg>
			<MapSvg
				{projection}
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
					{#if tooltipData.net_change > 0}
						<div>
							{districtName}
							gained <b>{tooltipData.net_change}</b> teachers in 2025.
						</div>
					{:else if tooltipData.net_change < 0}
						<div>
							{districtName}
							lost <b>{-1 * tooltipData.net_change}</b> out of {tooltipData.teachers_2024} teachers in
							2025.
						</div>
					{:else}
						<div>
							{districtName} had the <b>same number</b> of teachers in 2024 as in 20205.
						</div>
					{/if}

					<!-- {#each Object.entries(tooltipData) as [key, value]}
						{#if key != 'movers_in'}
							{@const keyCapitalized = key.replace(/^\w/, (d) => d.toUpperCase())}
							<div class="row">
								<span>{keyCapitalized}:</span>
								{typeof value === 'number' ? addCommas(value) : value}
							</div>
						{/if}
					{/each} -->
				</Tooltip>
			{/if}
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
		height: 400px;
	}
</style>
