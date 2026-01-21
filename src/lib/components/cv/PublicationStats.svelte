<script lang="ts">
	import type { PublicationStats } from '$lib/types/cv';
	import { onMount } from 'svelte';

	interface Props {
		stats: PublicationStats;
	}

	let { stats }: Props = $props();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function formatNumber(num: number | undefined): string {
		if (num === undefined) return '—';
		if (num >= 1000) {
			return `~${(num / 1000).toFixed(1)}k`;
		}
		return num.toLocaleString();
	}
</script>

<div class="stats-banner" class:mounted>
	{#if stats.totalPublications}
		<div class="stat-card" style="--delay: 0">
			<span class="stat-value">{stats.totalPublications}</span>
			<span class="stat-label">Publications</span>
		</div>
	{/if}

	{#if stats.totalCitations}
		<div class="stat-card" style="--delay: 1">
			<span class="stat-value">{formatNumber(stats.totalCitations)}</span>
			<span class="stat-label">Total Citations</span>
			{#if stats.googleScholarUrl}
				<a href={stats.googleScholarUrl} target="_blank" rel="noopener noreferrer" class="stat-source">
					Google Scholar
				</a>
			{/if}
		</div>
	{/if}

	{#if stats.hIndex}
		<div class="stat-card" style="--delay: 2">
			<span class="stat-value">{stats.hIndex}</span>
			<span class="stat-label">h-index</span>
			{#if stats.googleScholarUrl}
				<a href={stats.googleScholarUrl} target="_blank" rel="noopener noreferrer" class="stat-source">
					Google Scholar
				</a>
			{/if}
		</div>
	{/if}

	{#if stats.weightedRCR}
		<div class="stat-card" style="--delay: 3">
			<span class="stat-value">{formatNumber(stats.weightedRCR)}</span>
			<span class="stat-label">Weighted RCR</span>
			{#if stats.nihIciteUrl}
				<a href={stats.nihIciteUrl} target="_blank" rel="noopener noreferrer" class="stat-source">
					NIH iCite
				</a>
			{/if}
		</div>
	{/if}
</div>

<style>
	.stats-banner {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		justify-content: center;
	}

	.stat-card {
		flex: 1;
		min-width: 140px;
		max-width: 180px;
		padding: 1.25rem 1rem;
		background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark, #047857) 100%);
		border-radius: 12px;
		text-align: center;
		color: white;
		box-shadow: 0 4px 20px rgba(5, 150, 105, 0.3);
		transform: translateY(20px);
		opacity: 0;
		transition:
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.5s ease,
			box-shadow 0.3s ease;
		transition-delay: calc(var(--delay, 0) * 0.1s);
	}

	.mounted .stat-card {
		transform: translateY(0);
		opacity: 1;
	}

	.stat-card:hover {
		box-shadow: 0 8px 30px rgba(5, 150, 105, 0.4);
		transform: translateY(-2px);
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.stat-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.9;
		margin-top: 0.25rem;
	}

	.stat-source {
		display: inline-block;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		margin-top: 0.5rem;
		padding: 0.2rem 0.5rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 4px;
		transition: background 0.2s ease;
	}

	.stat-source:hover {
		background: rgba(255, 255, 255, 0.25);
		color: white;
		text-decoration: none;
	}

	@media (max-width: 600px) {
		.stats-banner {
			gap: 0.75rem;
		}

		.stat-card {
			min-width: calc(50% - 0.5rem);
			padding: 1rem 0.75rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.stat-label {
			font-size: 0.7rem;
		}
	}

	@media print {
		.stats-banner {
			gap: 0.5rem;
			margin-bottom: 1rem;
		}

		.stat-card {
			background: none;
			border: 1px solid var(--color-border);
			color: var(--color-text);
			box-shadow: none;
			padding: 0.75rem 0.5rem;
			opacity: 1;
			transform: none;
		}

		.stat-value {
			font-size: 1.25rem;
			color: var(--color-heading);
		}

		.stat-label {
			font-size: 0.65rem;
			color: var(--color-text-muted);
		}

		.stat-source {
			display: none;
		}
	}
</style>
