<script>
	import RetentionChangeChart from '$components/RetentionChangeChart.svelte';
</script>

<article class="mx-auto max-w-3xl px-4 py-12">
	<header class="pt-4 pb-6 text-center">
		<h1 class="text-3xl font-bold text-gray-900">2024 Arkansas Teacher Workforce Report</h1>
		<p class="mt-2 text-base text-gray-600">
			By the Office for Education Policy and the Arkansas Department of Education
		</p>

		<hr class="mt-6 border-t border-gray-300" />
	</header>
	<section>
		<h2 class="mb-2 text-2xl font-bold text-blue-900">Retention</h2>
		<h3 class="mb-2 text-xl font-bold text-gray-900">
			Arkansas teacher retention is still below pre-pandemic rates.
		</h3>
		<p class="mb-2 text-lg text-gray-700">
			In 2022-23, turnover increased by 5 percentage points (20%) above pre-pandemic levels. Teacher
			retention improved slightly, rising by nearly 1.1 percentage points from 2022-23 to 2023-24,
			but remains below pre-pandemic rates. Retention rates vary across districts and subject areas,
			with the southern and eastern regions experiencing the lowest retention, mirroring geographic
			shortage areas. Middle school teachers notably show decreased retention rates across subject
			areas.
		</p>
		<h3 class="mb-2 text-xl font-bold text-gray-900">
			To distinguish between different types of turnover, we use the following four terms:
		</h3>
		<ul class="mb-2 list-outside list-disc space-y-1 pl-6 text-lg text-gray-700">
			<li>
				<span class="font-bold text-red-800">Stayers</span>
				are teachers who remain teaching in the same school(s) from one year to the next.
			</li>
			<li>
				<span class="font-bold text-red-800">Movers</span> leave their current school(s) to teach in
				another school or district.
			</li>
			<li>
				<span class="font-bold text-red-800">Switchers</span> change from a teaching to a non-teaching
				role in the Arkansas education workforce from one year to the next.
			</li>
			<li>
				<span class="font-bold text-red-800">Exiters</span> are teachers who leave the Arkansas education
				workforce entirely.
			</li>
		</ul>
		<p class="mb-2 text-lg text-gray-700">
			The retention patterns for these groups have changed since COVID:
		</p>
		<div class="mb-2 flex justify-center bg-red-100 px-5 py-10">
			Stacked bar chart will go here.
		</div>
		<p class="mb-2 text-lg text-gray-700">
			There is variation in teacher retention rates across districts. We can say here more about
			this variation, and highlight a few key points.
		</p>
		<div class="mb-2 flex justify-center bg-red-100 px-5 py-10">Map will go here.</div>
		<p class="mb-2 text-lg text-gray-700">
			Middle school subjects have experienced the largest decline in retention:
		</p>
		<RetentionChangeChart class="my-6" />
	</section>
</article>
