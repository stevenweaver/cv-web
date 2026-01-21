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
		Mentoring
	} from '$lib/components/cv';

	let { data } = $props();
	const cv = $derived(data.cv);
</script>

<svelte:head>
	<title>{cv.personal.name} - CV</title>
	<meta name="description" content="Curriculum Vitae of {cv.personal.name}" />
</svelte:head>

<main class="cv">
	<Header personal={cv.personal} />

	<ContactLinks contact={cv.personal.contact} />

	{#if cv.positions && cv.positions.length > 0}
		<Positions positions={cv.positions} />
	{/if}

	{#if cv.education && cv.education.length > 0}
		<Education education={cv.education} />
	{/if}

	{#if cv.publications && cv.publications.length > 0}
		<Publications publications={cv.publications} highlightAuthor="Weaver" stats={cv.publicationStats} />
	{/if}

	{#if cv.software && cv.software.length > 0}
		<Software software={cv.software} />
	{/if}

	{#if cv.grants && cv.grants.length > 0}
		<Grants grants={cv.grants} />
	{/if}

	{#if cv.awards && cv.awards.length > 0}
		<Awards awards={cv.awards} />
	{/if}

	{#if cv.courses && cv.courses.length > 0}
		<Courses courses={cv.courses} />
	{/if}

	{#if cv.workshops && cv.workshops.length > 0}
		<Workshops workshops={cv.workshops} />
	{/if}

	{#if cv.mentoring && cv.mentoring.length > 0}
		<Mentoring mentees={cv.mentoring} />
	{/if}

	{#if cv.professionalActivities && cv.professionalActivities.length > 0}
		<ProfessionalActivities activities={cv.professionalActivities} />
	{/if}

	{#if cv.skills && cv.skills.length > 0}
		<section class="skills-section">
			<h2>Skills</h2>
			<div class="skills">
				{#each cv.skills as skill}
					<span class="skill">{skill}</span>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style>
	.cv {
		max-width: 850px;
		margin: 0 auto;
		padding: 2rem;
	}

	.skills-section {
		margin-bottom: 2rem;
	}

	.skills-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
		border-bottom: 2px solid var(--color-accent, #2563eb);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.skill {
		font-size: 0.9rem;
		color: var(--color-text, #374151);
		background: var(--color-bg-muted, #f9fafb);
		padding: 0.25rem 0.75rem;
		border-radius: 0.25rem;
		border: 1px solid var(--color-border, #e5e7eb);
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

		.skills-section h2 {
			font-size: 1.1rem;
		}

		.skill {
			font-size: 0.85rem;
			border-color: var(--color-text-muted);
			background: none;
		}
	}
</style>
