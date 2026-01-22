<script lang="ts">
	import type { Talk } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		talks: Talk[];
	}

	let { talks }: Props = $props();
</script>

<Section title="Presentations" id="talks">
	<div class="talks">
		{#each talks as talk}
			<div class="talk">
				<div class="talk-header">
					<h3>{talk.title}</h3>
					<span class="year">{talk.year}</span>
				</div>
				<div class="talk-details">
					<span class="event">{talk.event}</span>
					<span class="location">{talk.location}</span>
				</div>
			</div>
		{/each}
	</div>
</Section>

<style>
	.talks {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.talk {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.talk:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.talk-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
	}

	.year {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
		white-space: nowrap;
	}

	.talk-details {
		display: flex;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
	}

	.event {
		font-weight: 500;
		color: var(--color-accent, #059669);
	}

	.event::after {
		content: ' · ';
	}

	@media (max-width: 600px) {
		.talk-header {
			flex-direction: column;
			gap: 0.25rem;
		}

		.year {
			order: -1;
		}
	}

	@media print {
		.talk {
			padding-bottom: 0.5rem;
		}

		h3 {
			font-size: 0.95rem;
		}
	}
</style>
