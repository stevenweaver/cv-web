<script lang="ts">
	import type { Grant } from '$lib/types/cv';
	import { formatDateRange, formatAmount } from '$lib/utils/formatters';
	import Section from './Section.svelte';

	interface Props {
		grants: Grant[];
	}

	let { grants }: Props = $props();

	function statusClass(status?: string): string {
		switch (status) {
			case 'active':
				return 'status-active';
			case 'completed':
				return 'status-completed';
			case 'pending':
				return 'status-pending';
			default:
				return '';
		}
	}
</script>

<Section title="Grants & Funding" id="grants">
	<div class="grants-list">
		{#each grants as grant}
			<div class="grant-item">
				<div class="grant-header">
					<div class="grant-info">
						<h3>{grant.title}</h3>
						<div class="grant-meta">
							<span class="agency">{grant.agency}</span>
							<span class="role">Role: {grant.role}</span>
							{#if grant.pi}
								<span class="pi">PI: {grant.pi}</span>
							{/if}
						</div>
					</div>
					<div class="grant-details">
						{#if grant.status}
							<span class="status {statusClass(grant.status)}">{grant.status}</span>
						{/if}
						{#if grant.amount}
							<span class="amount">{formatAmount(grant.amount)}</span>
						{/if}
						<span class="date">{formatDateRange(grant.startDate, grant.endDate)}</span>
					</div>
				</div>
				{#if grant.description}
					<p class="description">{grant.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</Section>

<style>
	.grants-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.grant-item {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border-light, #f3f4f6);
	}

	.grant-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.grant-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.grant-info {
		flex: 1;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
	}

	.grant-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-top: 0.25rem;
		font-size: 0.9rem;
	}

	.agency {
		color: var(--color-accent, #2563eb);
		font-weight: 500;
	}

	.role,
	.pi {
		color: var(--color-text-muted, #6b7280);
	}

	.grant-details {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.status {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		text-transform: capitalize;
	}

	.status-active {
		background: #dcfce7;
		color: #166534;
	}

	.status-completed {
		background: #e5e7eb;
		color: #374151;
	}

	.status-pending {
		background: #fef3c7;
		color: #92400e;
	}

	.amount {
		font-weight: 600;
		color: var(--color-heading, #1a1a1a);
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

	@media (max-width: 600px) {
		.grant-header {
			flex-direction: column;
		}

		.grant-details {
			align-items: flex-start;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}

	@media print {
		h3 {
			font-size: 0.95rem;
		}

		.status {
			border: 1px solid currentColor;
			background: none;
		}
	}
</style>
