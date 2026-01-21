<script lang="ts">
	import type { ProfessionalActivity } from '$lib/types/cv';
	import { formatDateRange } from '$lib/utils/formatters';
	import Section from './Section.svelte';

	interface Props {
		activities: ProfessionalActivity[];
	}

	let { activities }: Props = $props();
</script>

<Section title="Professional Activities" id="professional-activities">
	<div class="activities-list">
		{#each activities as activity}
			<div class="activity-item">
				<div class="activity-header">
					<div class="activity-info">
						<h3>{activity.role}</h3>
						<span class="organization">{activity.organization}</span>
					</div>
					<span class="date">{formatDateRange(activity.startDate, activity.endDate)}</span>
				</div>
				{#if activity.description}
					<p class="description">{activity.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.activities-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.activity-item {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.activity-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.activity-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.activity-info {
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

	.organization {
		font-size: 0.9rem;
		color: var(--color-accent, #2563eb);
	}

	.date {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
		white-space: nowrap;
	}

	.description {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text, #374151);
	}

	@media print {
		h3 {
			font-size: 0.95rem;
		}
	}
</style>
