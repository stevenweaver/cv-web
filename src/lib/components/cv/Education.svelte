<script lang="ts">
	import type { Education } from '$lib/types/cv';
	import { formatDateRange } from '$lib/utils/formatters';
	import Section from './Section.svelte';

	interface Props {
		education: Education[];
	}

	let { education }: Props = $props();
</script>

<Section title="Education" id="education">
	<div class="education-list">
		{#each education as edu}
			<div class="education-item">
				<div class="education-header">
					<div class="education-info">
						<h3>{edu.degree} in {edu.field}</h3>
						<span class="institution">{edu.institution}</span>
						{#if edu.location}
							<span class="location">{edu.location}</span>
						{/if}
					</div>
					<span class="date">{formatDateRange(edu.startDate, edu.endDate)}</span>
				</div>
				{#if edu.dissertation}
					<p class="dissertation">
						<strong>Dissertation:</strong>
						{#if edu.dissertationUrl}
							<a href={edu.dissertationUrl} target="_blank" rel="noopener noreferrer">{edu.dissertation}</a>
						{:else}
							{edu.dissertation}
						{/if}
					</p>
				{/if}
				{#if edu.advisor}
					<p class="advisor"><strong>Advisor:</strong> {edu.advisor}</p>
				{/if}
				{#if edu.gpa}
					<p class="gpa"><strong>GPA:</strong> {edu.gpa}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.education-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.education-item {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.education-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.education-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.education-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
	}

	.institution {
		font-weight: 500;
		color: var(--color-accent, #2563eb);
	}

	.location {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
	}

	.date {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
		white-space: nowrap;
	}

	.dissertation,
	.advisor,
	.gpa {
		margin: 0.5rem 0 0;
		font-size: 0.95rem;
		color: var(--color-text, #374151);
	}

	@media (max-width: 600px) {
		.education-header {
			flex-direction: column;
			gap: 0.25rem;
		}
	}

	@media print {
		h3 {
			font-size: 1rem;
		}

		.dissertation,
		.advisor,
		.gpa {
			font-size: 0.9rem;
		}
	}
</style>
