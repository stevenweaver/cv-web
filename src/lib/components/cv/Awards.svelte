<script lang="ts">
	import type { Award } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		awards: Award[];
	}

	let { awards }: Props = $props();
</script>

<Section title="Awards & Honors" id="awards">
	<div class="awards-list">
		{#each awards as award}
			<div class="award-item">
				<div class="award-header">
					<div class="award-info">
						<h3>{award.title}</h3>
						{#if award.organization}
							<span class="organization">{award.organization}</span>
						{/if}
					</div>
					{#if award.date}
						<span class="date">{award.date}</span>
					{/if}
				</div>
				{#if award.description}
					<p class="description">{award.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.awards-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.award-item {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.award-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.award-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.award-info {
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
