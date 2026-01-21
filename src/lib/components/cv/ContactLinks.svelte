<script lang="ts">
	import type { ContactLinks } from '$lib/types/cv';

	interface Props {
		contact: ContactLinks;
	}

	let { contact }: Props = $props();

	const links = $derived(
		[
			{ key: 'email', href: contact.email ? `mailto:${contact.email}` : null, label: contact.email, icon: 'email' },
			{ key: 'website', href: contact.website, label: 'Website', icon: 'web' },
			{ key: 'github', href: contact.github, label: 'GitHub', icon: 'github' },
			{ key: 'linkedin', href: contact.linkedin, label: 'LinkedIn', icon: 'linkedin' },
			{ key: 'googleScholar', href: contact.googleScholar, label: 'Google Scholar', icon: 'scholar' },
			{ key: 'orcid', href: contact.orcid, label: 'ORCID', icon: 'orcid' },
			{ key: 'twitter', href: contact.twitter, label: 'Twitter', icon: 'twitter' }
		].filter((link) => link.href)
	);
</script>

<div class="contact-links">
	{#each links as link}
		<a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link">
			<span class="icon" data-icon={link.icon}>
				{#if link.icon === 'email'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
				{:else if link.icon === 'web'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
				{:else if link.icon === 'github'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
				{:else if link.icon === 'linkedin'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
				{:else if link.icon === 'scholar'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
				{:else if link.icon === 'orcid'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>
				{:else if link.icon === 'twitter'}
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
				{/if}
			</span>
			<span class="label">{link.label}</span>
		</a>
	{/each}
</div>

<style>
	.contact-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: var(--color-bg-muted, #f9fafb);
		border-radius: 0.5rem;
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text, #374151);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	.contact-link:hover {
		color: var(--color-link, #1d4ed8);
		text-decoration: underline;
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon svg {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 600px) {
		.contact-links {
			flex-direction: column;
			gap: 0.75rem;
		}
	}

	@media print {
		.contact-links {
			padding: 0.5rem;
			gap: 0.75rem;
			background: none;
			border: 1px solid var(--color-border, #e5e7eb);
		}

		.contact-link {
			font-size: 0.8rem;
		}

		.icon {
			width: 1rem;
			height: 1rem;
		}
	}
</style>
