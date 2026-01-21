<script lang="ts">
	import {
		Header,
		ContactLinks,
		Positions,
		Education,
		Awards,
		ProfessionalActivities,
		Grants,
		Publications,
		Software,
		Courses,
		Workshops,
		Mentoring,
		SideNav
	} from '$lib/components/cv';

	let { data } = $props();
	const cv = $derived(data.cv);

	const navItems = $derived(
		[
			cv.positions?.length && { id: 'positions', label: 'Positions' },
			cv.education?.length && { id: 'education', label: 'Education' },
			cv.software?.length && { id: 'software', label: 'Software' },
			cv.grants?.length && { id: 'grants', label: 'Grants' },
			cv.courses?.length && { id: 'courses', label: 'Teaching' },
			cv.workshops?.length && { id: 'workshops', label: 'Workshops' },
			cv.professionalActivities?.length && { id: 'professional-activities', label: 'Activities' },
			cv.publications?.length && { id: 'publications', label: 'Publications' }
		].filter(Boolean) as { id: string; label: string }[]
	);
</script>

<svelte:head>
	<title>{cv.personal.name} - CV</title>
	<meta name="description" content="Curriculum Vitae of {cv.personal.name}" />
</svelte:head>

<SideNav items={navItems} />

<main class="cv">
	<Header personal={cv.personal} />

	<ContactLinks contact={cv.personal.contact} />

	{#if cv.positions && cv.positions.length > 0}
		<Positions positions={cv.positions} />
	{/if}

	{#if cv.education && cv.education.length > 0}
		<Education education={cv.education} />
	{/if}

	{#if cv.software && cv.software.length > 0}
		<Software software={cv.software} />
	{/if}

	{#if cv.grants && cv.grants.length > 0}
		<Grants grants={cv.grants} />
	{/if}

	{#if cv.courses && cv.courses.length > 0}
		<Courses courses={cv.courses} />
	{/if}

	{#if cv.workshops && cv.workshops.length > 0}
		<Workshops workshops={cv.workshops} />
	{/if}

	{#if cv.professionalActivities && cv.professionalActivities.length > 0}
		<ProfessionalActivities activities={cv.professionalActivities} />
	{/if}

	{#if cv.publications && cv.publications.length > 0}
		<Publications publications={cv.publications} highlightAuthor="Weaver" stats={cv.publicationStats} />
	{/if}
</main>

<style>
	.cv {
		max-width: 850px;
		margin: 0 auto;
		padding: 2rem;
	}

	@media (max-width: 600px) {
		.cv {
			padding: 1rem;
		}
	}

	@media print {
		.cv {
			max-width: none;
			padding: 0;
		}
	}
</style>
