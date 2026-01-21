/**
 * Format a date range for display
 * @param start - Start date (year or full date)
 * @param end - End date (year or full date), undefined means "present"
 */
export function formatDateRange(start?: string, end?: string): string {
	if (!start && !end) return '';
	if (!start) return end || '';
	if (!end) return `${start} – Present`;
	if (start === end) return start;
	return `${start} – ${end}`;
}

/**
 * Format an author list with optional highlighting of a specific name
 * @param authors - Array of author names
 * @param highlightName - Name to highlight (will be bolded)
 */
export function formatAuthors(authors: string[], highlightName?: string): string {
	if (!authors || authors.length === 0) return '';

	return authors
		.map((author) => {
			if (highlightName && author.toLowerCase().includes(highlightName.toLowerCase())) {
				return `<strong>${author}</strong>`;
			}
			return author;
		})
		.join(', ');
}

/**
 * Get initials from a full name
 */
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase();
}

/**
 * Format a grant amount for display
 */
export function formatAmount(amount?: string): string {
	if (!amount) return '';
	// If already formatted, return as-is
	if (amount.includes('$') || amount.includes(',')) return amount;
	// Try to format as currency
	const num = parseFloat(amount);
	if (!isNaN(num)) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(num);
	}
	return amount;
}

/**
 * Create a DOI link
 */
export function doiLink(doi?: string): string | undefined {
	if (!doi) return undefined;
	if (doi.startsWith('http')) return doi;
	return `https://doi.org/${doi}`;
}

/**
 * Create a PubMed link
 */
export function pmidLink(pmid?: string): string | undefined {
	if (!pmid) return undefined;
	return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}
