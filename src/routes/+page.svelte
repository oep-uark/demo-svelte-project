<script>
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { stack } from 'layercake';

	import RetentionChangeChart from '$components/RetentionChangeChart.svelte';
	import RetentionStackedBarChart from '$components/RetentionStackedBarChart.svelte';
	import DistrictMap from '$components/DistrictMap.svelte';
	import ExitersLineChart from '$components/ExitersLineChart.svelte';
	import SwitchersLineChart from '$components/SwitchersLineChart.svelte';
</script>

<article class="w-full max-w-none space-y-8 px-0">
	<!-- <header class="pt-4 pb-6 text-center">
		<h1 class="text-3xl font-bold text-gray-900">
			2024–25 Arkansas Teacher Retention: <br /> Statewide Stability Amid Ongoing Local Challenges
		</h1>
		<hr class="mt-6 border-t border-gray-300" />
	</header> -->
	<section>
		<p class="mb-2 text-base text-gray-700">
			Arkansas’s teacher retention rate held steady in the 2024–25 school year but remains below
			pre-pandemic levels. Approximately <b>12.8%</b> of teachers left the classroom, still well
			above the <b>~10%</b> exit rate typical before the pandemic.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Last year, <a
				href="https://oep.uark.edu/arkansas-teacher-retention-for-the-2023-24-school-year/"
				target="_blank"
				rel="noopener">we highlighted early signs of a recovery</a
			>
			in teacher retention following
			<a
				href="https://oep.uark.edu/three-years-later-arkansas-teacher-turnover-during-and-after-covid-19/"
				target="_blank"
				rel="noopener">pandemic-era declines</a
			>. Now, with updated data from 2024–25, we examine whether that recovery continued—and the
			persistent retention challenges facing many Arkansas schools.
		</p>
	</section>
	<section>
		<h3 class="mb-2 text-xl font-bold text-gray-900">Teacher Retention Stabilized in 2024–25</h3>
		<p class="mb-2 text-base text-gray-700">
			Our analysis categorizes teachers based on their employment decisions between spring 2024 and
			fall 2025:
		</p>
		<ul class="mb-6 list-outside list-disc space-y-1 pl-6 text-base text-gray-700">
			<li>
				<span class="font-bold text-[#002F70]">Stayers</span>
				remained in the same school(s);
			</li>
			<li>
				<span class="font-bold text-[#B4C2EB]">Movers</span> transferred to a different school or district;
			</li>
			<li>
				<span class="font-bold text-[#EDB4B5]">Switchers</span> moved to a non-teaching role within Arkansas
				public schools;
			</li>
			<li>
				<span class="font-bold text-red-800">Exiters</span> left the Arkansas public school system entirely.
			</li>
		</ul>
		<RetentionStackedBarChart />
		<p class="mt-6 mb-2 text-base text-gray-700">In 2024-25:</p>
		<ul class="mb-2 list-outside list-disc space-y-1 pl-6 text-base text-gray-700">
			<li>
				<span class="font-bold text-[#002F70]">77.7%</span>
				of teachers were Stayers;
			</li>
			<li>
				<span class="font-bold text-[#B4C2EB]">10.1%</span> were Movers—4.7% moved within district and
				5.4% moved between districts;
			</li>
			<li>
				<span class="font-bold text-[#EDB4B5]">3.6%</span> were Switchers; and
			</li>
			<li>
				<span class="font-bold text-red-800">9.2%</span> exited the system entirely—6.5% left the Arkansas
				public school workforce and 2.7% retired.
			</li>
		</ul>
		<p class="mb-2 text-base text-gray-700">
			These figures are nearly identical to those from 2023–24 and represent a <b
				>2.1 percentage point increase</b
			> in retention compared to the low point in 2022–23. However, they have not improved beyond last
			year’s levels, and retention rates continue to be lower than in pre-pandemic times, suggesting
			a potential plateau in recovery.
		</p>
	</section>
	<section>
		<h3 class="mb-2 text-xl font-bold text-gray-900">
			Increased Exits Aren’t Being Driven by Retirements
		</h3>
		<p class="mb-2 text-base text-gray-700">
			To understand what’s behind the stalled improvement, we took a closer look at the Exiters.
		</p>
		<p class="mb-6 text-base text-gray-700">
			While <b>9.2%</b> of all teachers left Arkansas public schools in 2024–25, a higher share than
			during pre-pandemic times,
			<b>2.7%</b> retired. The remaining <b>6.5%</b> left for other reasons, likely to pursue non-teaching
			careers.
		</p>
		<ExitersLineChart />
		<p class="mt-6 mb-2 text-base text-gray-700">
			This retirement rate aligns with historical norms. Between 2014–15 and 2019–20, retirements
			averaged <b>2.9%</b> annually. In other words, the uptick in exits, observed since the pandemic,
			is not driven by a wave of retirements, but by early- and mid-career teachers leaving the profession.
		</p>
	</section>
	<section>
		<h3 class="mb-2 text-xl font-bold text-gray-900">
			The Rate of Switchers Continues to be Elevated Compared to Pre-pandemic Years
		</h3>
		<p class="mb-2">
			Unlike the retirement rate, the rate of switchers - teachers leaving the classroom for
			non-instructional roles - is higher than historical trends.
		</p>
		<SwitchersLineChart />
	</section>
	<section>
		<h3 class="mb-2 text-xl font-bold text-gray-900">Retention Patterns Vary Widely by District</h3>
		<p class="mb-2 text-base text-gray-700">
			Retention rates in 2024–25 ranged from <b>55% to 95%</b> across districts.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Seven districts had retention rates below 65%, five of which are in <b
				>southern or eastern Arkansas,</b
			>
			regions identified by the Arkansas Department of Education as
			<a
				href="https://dese-admin.ade.arkansas.gov/Files/24-25_Archive_Doc_for_Webpage_EEF.pdf"
				target="_blank"
				rel="noopener"
			>
				geographic shortage areas.</a
			>
		</p>
		<p class="mb-2 text-base text-gray-700">
			But geographic trends aren’t absolute, and teachers’ job transitions can vary widely across
			districts. Some districts in these areas, like <b>DeWitt (88.4%)</b> and
			<b>Hamburg (89.2%)</b>, reported retention rates well above the state average.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Looking closer at two neighboring districts illustrates how teacher movement patterns can
			diverge:
		</p>
		<ul class="mb-2 list-outside list-disc space-y-2 pl-6 text-base text-gray-700">
			<li>
				In <b>Strong-Huttig,</b> 38% of the 2023-24 teachers are no longer in district classrooms.
				Of those, 73% left the profession and 27% stayed in Arkansas public schools. Most weren’t
				looking for a different teaching job—they left the Arkansas public education altogether.
				<div class="my-4">
					<DistrictMap interactive={false} initialSelectedDistrictId={'7009000'} />
				</div>
			</li>
			<li>
				In <b>Hermitage,</b> where 35% of teachers were no longer teaching in the district, 55% of
				those moved to teach in other districts, 18% switched roles, and only 27% left the
				profession. Most teachers here stayed in education, just not in the same district.
				<div class="my-4">
					<DistrictMap interactive={false} initialSelectedDistrictId={'0601000'} />
				</div>
			</li>
		</ul>
		<p class="mb-2 text-base text-gray-700">
			These examples show that <b>retention is a local issue,</b> shaped by conditions and dynamics that
			differ district by district.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Explore the patterns in your area using the interactive map below.
		</p>
		<div class="my-4">
			<DistrictMap />
		</div>
	</section>
	<section>
		<h3 class="mb-2 text-xl font-bold text-gray-900">
			Retention Is Moving in the Right Direction—But Work Remains
		</h3>
		<p class="mb-2 text-base text-gray-700">
			Teacher retention in Arkansas has stabilized after post-pandemic declines. While not yet back
			to pre-pandemic levels, the trend is no longer worsening, and some districts are seeing strong
			improvements.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Still, challenges remain. Exit and switcher rates remain elevated, and certain
			districts—particularly in geographic shortage areas—continue to face high turnover. These
			local disruptions have real implications for student learning and school stability.
		</p>
		<p class="mb-2 text-base text-gray-700">
			Importantly, the state has not stood still. Arkansas has implemented several key policies to
			support the educator workforce, including <a
				href="https://dese-admin.ade.arkansas.gov/Files/24-25_Archive_Doc_for_Webpage_EEF.pdf"
				target="_blank"
				rel="noopener"><b>significant salary increases under the LEARNS Act</b></a
			>,
			<a
				href="https://dese-admin.ade.arkansas.gov/Files/24-25_Archive_Doc_for_Webpage_EEF.pdf"
				target="_blank"
				rel="noopener"><b>merit pay</b></a
			>
			for those who work in <b>geographic and subject shortage areas,</b> and the launch of a
			<b>teacher apprenticeship program</b> to build a stronger pipeline of future teachers. These are
			meaningful steps forward.
		</p>
		<p class="mb-2 text-base text-gray-700">
			But if we want to see continued progress, especially in the hardest-to-staff areas, more
			targeted efforts may be needed. Strengthening support for early-career teachers, <a
				href="https://dese-admin.ade.arkansas.gov/Files/24-25_Archive_Doc_for_Webpage_EEF.pdf"
				target="_blank"
				rel="noopener">improving working conditions</a
			>, and addressing the specific needs of high-turnover districts could help move retention even
			further in the right direction.
		</p>
		<p class="mb-2 text-base text-gray-700">
			With continued attention and collaboration among state leaders, districts, and communities,
			Arkansas has the opportunity to not just stabilize teacher retention but to rebuild a teacher
			workforce stronger than before.
		</p>
	</section>
</article>

<style>
	a {
		color: #9d2235;
		text-decoration: underline;
	}
	a:hover {
		text-decoration: none;
	}
</style>
