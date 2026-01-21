<script lang="ts">
	import type { Position } from '$lib/types/cv';
	import { formatDateRange } from '$lib/utils/formatters';
	import Section from './Section.svelte';

	interface Props {
		positions: Position[];
	}

	let { positions }: Props = $props();
</script>

<Section title="Experience" id="experience">
	<div class="positions">
		{#each positions as position}
			<div class="position">
				<div class="position-header">
					<div class="position-title">
						<h3>{position.title}</h3>
						<span class="organization">{position.organization}</span>
						{#if position.location}
							<span class="location">{position.location}</span>
						{/if}
					</div>
					<span class="date">{formatDateRange(position.startDate, position.endDate)}</span>
				</div>
				{#if position.description}
					<p class="description">{position.description}</p>
				{/if}
				{#if position.highlights && position.highlights.length > 0}
					<ul class="highlights">
						{#each position.highlights as highlight}
							<li>{highlight}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.positions {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.position {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.position:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.position-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.position-title {
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

	.organization {
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

	.description {
		margin: 0.5rem 0;
		color: var(--color-text, #374151);
		line-height: 1.6;
	}

	.highlights {
		margin: 0.5rem 0 0;
		padding-left: 1.25rem;
		color: var(--color-text, #374151);
	}

	.highlights li {
		margin-bottom: 0.25rem;
		line-height: 1.5;
	}

	@media (max-width: 600px) {
		.position-header {
			flex-direction: column;
			gap: 0.25rem;
		}

		.date {
			order: -1;
		}
	}

	@media print {
		.position {
			padding-bottom: 0.75rem;
		}

		h3 {
			font-size: 1rem;
		}

		.description,
		.highlights {
			font-size: 0.9rem;
		}
	}
</style>
