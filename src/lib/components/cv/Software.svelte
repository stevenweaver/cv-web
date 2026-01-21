<script lang="ts">
	import type { Software } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		software: Software[];
	}

	let { software }: Props = $props();
</script>

<Section title="Software" id="software">
	<div class="software-list">
		{#each software as project}
			<div class="software-item">
				<div class="software-header">
					<h3>
						{#if project.url}
							<a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
						{:else}
							{project.name}
						{/if}
					</h3>
					{#if project.role}
						<span class="role">{project.role}</span>
					{/if}
				</div>
				<p class="description">{project.description}</p>
				<div class="meta">
					{#if project.technologies && project.technologies.length > 0}
						<div class="technologies">
							{#each project.technologies as tech}
								<span class="tech">{tech}</span>
							{/each}
						</div>
					{/if}
					{#if project.github}
						<a href={project.github} target="_blank" rel="noopener noreferrer" class="github-link">
							<svg viewBox="0 0 24 24" fill="currentColor" class="github-icon">
								<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
							</svg>
							GitHub
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Section>

<style>
	.software-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.software-item {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.software-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.software-header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	h3 a {
		color: var(--color-accent, #2563eb);
		text-decoration: none;
	}

	h3 a:hover {
		text-decoration: underline;
	}

	.role {
		font-size: 0.85rem;
		color: var(--color-text-muted, #6b7280);
		background: var(--color-bg-muted, #f9fafb);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
	}

	.description {
		margin: 0.5rem 0;
		color: var(--color-text, #374151);
		line-height: 1.6;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.tech {
		font-size: 0.8rem;
		color: var(--color-text-muted, #6b7280);
		background: var(--color-bg-muted, #f9fafb);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid var(--color-border, #e5e7eb);
	}

	.github-link {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.85rem;
		color: var(--color-text, #374151);
		text-decoration: none;
	}

	.github-link:hover {
		color: var(--color-accent, #2563eb);
	}

	.github-icon {
		width: 1rem;
		height: 1rem;
	}

	@media print {
		h3 {
			font-size: 1rem;
		}

		h3 a {
			color: var(--color-heading, #1a1a1a);
		}

		.description {
			font-size: 0.9rem;
		}
	}
</style>
