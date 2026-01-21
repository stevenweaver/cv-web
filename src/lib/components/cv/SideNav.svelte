<script lang="ts">
	import { onMount } from 'svelte';

	interface NavItem {
		id: string;
		label: string;
	}

	interface Props {
		items: NavItem[];
	}

	let { items }: Props = $props();
	let activeId = $state('');

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);

		items.forEach((item) => {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<nav class="side-nav">
	<ul>
		{#each items as item}
			<li>
				<a href="#{item.id}" class:active={activeId === item.id}>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.side-nav {
		position: fixed;
		left: 2rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	a {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
		color: var(--color-text-muted, #6b7280);
		text-decoration: none;
		border-left: 2px solid var(--color-border, #e5e7eb);
		transition: all 0.2s ease;
	}

	a:hover {
		color: var(--color-text, #374151);
		border-left-color: var(--color-text-muted, #6b7280);
	}

	a.active {
		color: var(--color-accent, #059669);
		border-left-color: var(--color-accent, #059669);
		font-weight: 500;
	}

	@media (max-width: 1200px) {
		.side-nav {
			display: none;
		}
	}

	@media print {
		.side-nav {
			display: none;
		}
	}
</style>
