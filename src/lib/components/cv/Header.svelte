<script lang="ts">
	import type { PersonalInfo } from '$lib/types/cv';
	import { base } from '$app/paths';

	interface Props {
		personal: PersonalInfo;
	}

	let { personal }: Props = $props();
</script>

<header class="cv-header">
	<div class="header-content">
		{#if personal.photo}
			<div class="photo-container">
				<img src="{base}{personal.photo}" alt={personal.name} class="headshot" />
			</div>
		{/if}
		<div class="info">
			<h1>{personal.name}</h1>
			<p class="title">{personal.title}</p>
			{#if personal.bio}
				<p class="bio">{personal.bio}</p>
			{/if}
			{#if personal.researchInterests && personal.researchInterests.length > 0}
				<div class="research-interests">
					<span class="label">Research Interests:</span>
					<span class="interests">{personal.researchInterests.join(' • ')}</span>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	.cv-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid var(--color-border, #e5e7eb);
	}

	.header-content {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.photo-container {
		flex-shrink: 0;
	}

	.headshot {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--color-accent, #2563eb);
	}

	.info {
		flex: 1;
	}

	h1 {
		margin: 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-heading, #1a1a1a);
	}

	.title {
		margin: 0.25rem 0 0;
		font-size: 1.25rem;
		color: var(--color-accent, #2563eb);
		font-weight: 500;
	}

	.bio {
		margin: 1rem 0 0;
		color: var(--color-text, #374151);
		line-height: 1.6;
	}

	.research-interests {
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	.label {
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
	}

	.interests {
		color: var(--color-text-muted, #6b7280);
	}

	@media (max-width: 600px) {
		.header-content {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		h1 {
			font-size: 2rem;
		}

		.headshot {
			width: 100px;
			height: 100px;
		}
	}

	@media print {
		.cv-header {
			margin-bottom: 1rem;
			padding-bottom: 1rem;
		}

		.headshot {
			width: 80px;
			height: 80px;
		}

		h1 {
			font-size: 1.8rem;
		}

		.title {
			font-size: 1rem;
		}

		.bio {
			font-size: 0.9rem;
		}
	}
</style>
