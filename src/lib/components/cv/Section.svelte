<script lang="ts">
	interface Props {
		title: string;
		id?: string;
	}

	let { title, id, children }: Props & { children?: any } = $props();
</script>

<section {id} class="cv-section">
	<h2>{title}</h2>
	<div class="section-content">
		{@render children?.()}
	</div>
</section>

<style>
	.cv-section {
		margin-bottom: 2rem;
		page-break-inside: avoid;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
		border-bottom: 2px solid var(--color-accent, #2563eb);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.section-content {
		padding-left: 0;
	}

	@media print {
		.cv-section {
			margin-bottom: 1rem;
			page-break-inside: auto;
		}

		h2 {
			font-size: 1.1rem;
			margin-bottom: 0.5rem;
			page-break-after: avoid;
		}

		.section-content {
			page-break-before: avoid;
		}
	}
</style>
