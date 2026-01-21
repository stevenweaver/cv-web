<script lang="ts">
	import type { Course } from '$lib/types/cv';
	import Section from './Section.svelte';

	interface Props {
		courses: Course[];
	}

	let { courses }: Props = $props();
</script>

<Section title="Teaching" id="courses">
	<div class="courses-list">
		{#each courses as course}
			<div class="course-item">
				<div class="course-header">
					<div class="course-info">
						<h3>
							{#if course.code}
								<span class="code">{course.code}:</span>
							{/if}
							{course.title}
						</h3>
						<span class="institution">{course.institution}</span>
					</div>
					<span class="role">{course.role}</span>
				</div>
				{#if course.semesters && course.semesters.length > 0}
					<p class="semesters">{course.semesters.join(', ')}</p>
				{/if}
				{#if course.description}
					<p class="description">{course.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.courses-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.course-item {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.course-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.course-info {
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

	.code {
		color: var(--color-accent, #2563eb);
	}

	.institution {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
	}

	.role {
		font-size: 0.85rem;
		color: var(--color-text-muted, #6b7280);
		background: var(--color-bg-muted, #f9fafb);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
		white-space: nowrap;
	}

	.semesters {
		margin: 0.25rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b7280);
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
