<script lang="ts">
	import type { Mentee } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		mentees: Mentee[];
	}

	let { mentees }: Props = $props();
</script>

<Section title="Mentoring" id="mentoring">
	<div class="mentoring-list">
		{#each mentees as mentee}
			<div class="mentee-item">
				<div class="mentee-header">
					<div class="mentee-info">
						<h3>{mentee.name}</h3>
						<div class="meta">
							{#if mentee.degree}
								<span class="degree">{mentee.degree}</span>
							{/if}
							{#if mentee.institution}
								<span class="institution">{mentee.institution}</span>
							{/if}
						</div>
					</div>
					{#if mentee.period}
						<span class="period">{mentee.period}</span>
					{/if}
				</div>
				{#if mentee.coAdvisors && mentee.coAdvisors.length > 0}
					<p class="co-advisors">
						<strong>Co-advisor{mentee.coAdvisors.length > 1 ? 's' : ''}:</strong>
						{mentee.coAdvisors.join(', ')}
					</p>
				{/if}
				{#if mentee.currentPosition}
					<p class="current-position">
						<strong>Current Position:</strong> {mentee.currentPosition}
					</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.mentoring-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.mentee-item {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.mentee-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.mentee-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.mentee-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		font-size: 0.9rem;
	}

	.degree {
		color: var(--color-accent, #2563eb);
	}

	.institution {
		color: var(--color-text-muted, #6b7280);
	}

	.period {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
		white-space: nowrap;
	}

	.co-advisors,
	.current-position {
		margin: 0.25rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text, #374151);
	}

	@media print {
		h3 {
			font-size: 0.95rem;
		}
	}
</style>
