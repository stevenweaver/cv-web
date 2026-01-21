<script lang="ts">
	import type { Publication, PublicationStats } from '$lib/types/cv';
	import { formatAuthors, doiLink, pmidLink } from '$lib/utils/formatters';
	import Section from './Section.svelte';
	import PublicationStatsComponent from './PublicationStats.svelte';

	interface Props {
		publications: Publication[];
		highlightAuthor?: string;
		stats?: PublicationStats;
	}

	let { publications, highlightAuthor = 'Weaver', stats }: Props = $props();
</script>

<Section title="Publications" id="publications">
	{#if stats}
		<PublicationStatsComponent {stats} />
	{/if}
	<ol class="publications-list">
		{#each publications as pub}
			<li class="publication-item">
				<div class="publication-content">
					<h3 class="title">{pub.title}</h3>
					<p class="authors">{@html formatAuthors(pub.authors, highlightAuthor)}</p>
					<p class="venue">
						{#if pub.journal}
							<em>{pub.journal}</em>
						{/if}
						{#if pub.volume}
							<span class="volume">{pub.volume}</span>
						{/if}
						{#if pub.issue}
							<span class="issue">({pub.issue})</span>
						{/if}
						{#if pub.pages}
							<span class="pages">: {pub.pages}</span>
						{/if}
						<span class="year">({pub.year})</span>
					</p>
					<div class="links">
						{#if pub.doi}
							<a href={doiLink(pub.doi)} target="_blank" rel="noopener noreferrer" class="link">
								DOI
							</a>
						{/if}
						{#if pub.pmid}
							<a href={pmidLink(pub.pmid)} target="_blank" rel="noopener noreferrer" class="link">
								PubMed
							</a>
						{/if}
						{#if pub.url}
							<a href={pub.url} target="_blank" rel="noopener noreferrer" class="link">
								Link
							</a>
						{/if}
						{#if pub.citations}
							<span class="citations">{pub.citations} citations</span>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<style>
	.publications-list {
		list-style: decimal;
		padding-left: 1.5rem;
		margin: 0;
	}

	.publication-item {
		margin-bottom: 1.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.publication-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.publication-content {
		padding-left: 0.5rem;
	}

	.title {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
		line-height: 1.4;
	}

	.authors {
		margin: 0.25rem 0;
		font-size: 0.9rem;
		color: var(--color-text, #374151);
		line-height: 1.5;
	}

	.authors :global(strong) {
		color: var(--color-accent, #2563eb);
	}

	.venue {
		margin: 0.25rem 0;
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
	}

	.volume {
		font-weight: 500;
	}

	.year {
		margin-left: 0.25rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.link {
		font-size: 0.85rem;
		color: var(--color-link, #1d4ed8);
		text-decoration: none;
		padding: 0.125rem 0.5rem;
		border: 1px solid var(--color-link, #1d4ed8);
		border-radius: 0.25rem;
		transition: all 0.2s;
	}

	.link:hover {
		background: var(--color-link, #1d4ed8);
		color: white;
		text-decoration: none;
	}

	.citations {
		font-size: 0.85rem;
		color: var(--color-text-muted, #6b7280);
	}

	@media print {
		.publication-item {
			margin-bottom: 0.75rem;
			padding-bottom: 0.5rem;
		}

		.title {
			font-size: 0.95rem;
		}

		.link {
			color: var(--color-text, #374151);
			border-color: var(--color-text, #374151);
		}
	}
</style>
