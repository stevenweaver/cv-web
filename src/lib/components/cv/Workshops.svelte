<script lang="ts">
	import type { Workshop } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		workshops: Workshop[];
	}

	let { workshops }: Props = $props();
</script>

<Section title="Workshops" id="workshops">
	<div class="workshops-list">
		{#each workshops as workshop}
			<div class="workshop-item">
				<div class="workshop-header">
					<div class="workshop-info">
						<h3>
							{#if workshop.url}
								<a href={workshop.url} target="_blank" rel="noopener noreferrer">{workshop.title}</a>
							{:else}
								{workshop.title}
							{/if}
						</h3>
						<div class="meta">
							<span class="role">{workshop.role}</span>
							{#if workshop.location}
								<span class="location">{workshop.location}</span>
							{/if}
						</div>
					</div>
					{#if workshop.date}
						<span class="date">{workshop.date}</span>
					{/if}
				</div>
				{#if workshop.description}
					<p class="description">{workshop.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.workshops-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.workshop-item {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.workshop-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.workshop-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.workshop-info {
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

	h3 a {
		color: var(--color-accent, #2563eb);
		text-decoration: none;
	}

	h3 a:hover {
		text-decoration: underline;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		font-size: 0.9rem;
	}

	.role {
		color: var(--color-accent, #2563eb);
	}

	.location {
		color: var(--color-text-muted, #6b7280);
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

		h3 a {
			color: var(--color-heading, #1a1a1a);
		}
	}
</style>
