#!/usr/bin/env node

/**
 * Fetch publications from ORCID and PubMed APIs
 * Updates src/lib/data/cv.json with the latest publications
 *
 * Usage: node scripts/fetch-publications.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ORCID_ID = '0000-0002-6931-7191';
const AUTHOR_HIGHLIGHT_NAME = 'Weaver';
const CV_JSON_PATH = join(__dirname, '../src/lib/data/cv.json');

// API endpoints
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
const PUBMED_SEARCH_API = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const PUBMED_FETCH_API = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

// Rate limiting helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch publications from ORCID
 */
async function fetchFromOrcid() {
	console.log(`Fetching publications from ORCID (${ORCID_ID})...`);

	const response = await fetch(ORCID_API, {
		headers: {
			'Accept': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`ORCID API error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	const works = data.group || [];

	console.log(`Found ${works.length} works in ORCID`);

	const publications = [];

	for (const work of works) {
		const workSummary = work['work-summary']?.[0];
		if (!workSummary) continue;

		const title = workSummary.title?.title?.value || 'Untitled';
		const year = workSummary['publication-date']?.year?.value || '';
		const journal = workSummary['journal-title']?.value || '';
		const type = mapWorkType(workSummary.type);

		// Extract external IDs (DOI, PMID, etc.)
		const externalIds = {};
		const ids = work['external-ids']?.['external-id'] || [];
		for (const id of ids) {
			const idType = id['external-id-type'];
			const idValue = id['external-id-value'];
			if (idType === 'doi') externalIds.doi = idValue;
			if (idType === 'pmid') externalIds.pmid = idValue;
			if (idType === 'pmc') externalIds.pmc = idValue;
		}

		publications.push({
			title,
			authors: [], // Will be enriched from PubMed
			journal,
			year,
			doi: externalIds.doi,
			pmid: externalIds.pmid,
			type,
			_putCode: workSummary['put-code'] // For fetching full details if needed
		});
	}

	return publications;
}

/**
 * Map ORCID work types to our schema
 */
function mapWorkType(orcidType) {
	const typeMap = {
		'journal-article': 'journal',
		'conference-paper': 'conference',
		'preprint': 'preprint',
		'book': 'book',
		'book-chapter': 'chapter',
		'dissertation': 'dissertation'
	};
	return typeMap[orcidType] || 'journal';
}

/**
 * Fetch additional details from PubMed for publications with PMIDs
 */
async function enrichFromPubMed(publications) {
	const withPmid = publications.filter(p => p.pmid);
	console.log(`Enriching ${withPmid.length} publications from PubMed...`);

	if (withPmid.length === 0) return publications;

	// Batch fetch from PubMed (max 200 at a time)
	const pmids = withPmid.map(p => p.pmid);
	const batchSize = 200;

	for (let i = 0; i < pmids.length; i += batchSize) {
		const batch = pmids.slice(i, i + batchSize);

		const url = `${PUBMED_FETCH_API}?db=pubmed&id=${batch.join(',')}&rettype=xml&retmode=xml`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				console.warn(`PubMed fetch error: ${response.status}`);
				continue;
			}

			const xml = await response.text();

			// Parse XML and extract author info
			// First, extract all individual articles
			const articles = [...xml.matchAll(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/gi)];

			for (const pub of withPmid) {
				if (!batch.includes(pub.pmid)) continue;

				// Find the article containing this specific PMID
				const articleXml = articles.find(match => {
					const pmidMatch = match[0].match(/<PMID[^>]*>(\d+)<\/PMID>/i);
					return pmidMatch && pmidMatch[1] === pub.pmid;
				})?.[0];

				if (articleXml) {

					// Extract authors
					const authors = [];
					const authorMatches = articleXml.matchAll(/<Author[^>]*>[\s\S]*?<LastName>([^<]+)<\/LastName>[\s\S]*?<ForeName>([^<]*)<\/ForeName>[\s\S]*?<\/Author>/gi);
					for (const match of authorMatches) {
						const lastName = match[1];
						const foreName = match[2];
						authors.push(`${foreName} ${lastName}`.trim());
					}

					if (authors.length > 0) {
						pub.authors = authors;
					}

					// Extract volume, issue, pages
					const volumeMatch = articleXml.match(/<Volume>([^<]+)<\/Volume>/);
					const issueMatch = articleXml.match(/<Issue>([^<]+)<\/Issue>/);
					const pagesMatch = articleXml.match(/<MedlinePgn>([^<]+)<\/MedlinePgn>/);

					if (volumeMatch) pub.volume = volumeMatch[1];
					if (issueMatch) pub.issue = issueMatch[1];
					if (pagesMatch) pub.pages = pagesMatch[1];
				}
			}

			// Rate limiting for NCBI
			await delay(350);

		} catch (error) {
			console.warn(`Error fetching PubMed batch: ${error.message}`);
		}
	}

	return publications;
}

/**
 * Search PubMed for publications without PMIDs (by DOI or title)
 */
async function findMissingPmids(publications) {
	const withoutPmid = publications.filter(p => !p.pmid && p.doi);
	console.log(`Searching PubMed for ${withoutPmid.length} publications without PMIDs...`);

	for (const pub of withoutPmid) {
		try {
			// Search by DOI
			const searchUrl = `${PUBMED_SEARCH_API}?db=pubmed&term=${encodeURIComponent(pub.doi)}[doi]&retmode=json`;
			const response = await fetch(searchUrl);

			if (response.ok) {
				const data = await response.json();
				const ids = data.esearchresult?.idlist || [];
				if (ids.length > 0) {
					pub.pmid = ids[0];
					console.log(`  Found PMID ${pub.pmid} for DOI ${pub.doi}`);
				}
			}

			// Rate limiting
			await delay(350);

		} catch (error) {
			console.warn(`Error searching PubMed for ${pub.doi}: ${error.message}`);
		}
	}

	return publications;
}

/**
 * Clean up and format publications for CV
 */
function formatPublications(publications) {
	return publications
		.filter(p => p.title && p.year) // Must have title and year
		.map(p => {
			const formatted = {
				title: p.title,
				authors: p.authors || [],
				year: p.year
			};

			if (p.journal) formatted.journal = p.journal;
			if (p.volume) formatted.volume = p.volume;
			if (p.issue) formatted.issue = p.issue;
			if (p.pages) formatted.pages = p.pages;
			if (p.doi) formatted.doi = p.doi;
			if (p.pmid) formatted.pmid = p.pmid;
			if (p.type) formatted.type = p.type;

			return formatted;
		})
		.sort((a, b) => {
			// Sort by year descending, then by title
			const yearDiff = parseInt(b.year) - parseInt(a.year);
			if (yearDiff !== 0) return yearDiff;
			return a.title.localeCompare(b.title);
		});
}

/**
 * Update cv.json with new publications
 */
function updateCvJson(publications) {
	console.log(`\nUpdating ${CV_JSON_PATH}...`);

	const cvData = JSON.parse(readFileSync(CV_JSON_PATH, 'utf-8'));

	// Backup existing publications count
	const oldCount = cvData.publications?.length || 0;

	// Update publications
	cvData.publications = publications;

	// Write back
	writeFileSync(CV_JSON_PATH, JSON.stringify(cvData, null, '\t') + '\n');

	console.log(`Updated publications: ${oldCount} -> ${publications.length}`);
}

/**
 * Main function
 */
async function main() {
	console.log('='.repeat(60));
	console.log('Publication Fetch Script');
	console.log('='.repeat(60));
	console.log();

	try {
		// Step 1: Fetch from ORCID
		let publications = await fetchFromOrcid();

		// Step 2: Find missing PMIDs
		publications = await findMissingPmids(publications);

		// Step 3: Enrich from PubMed
		publications = await enrichFromPubMed(publications);

		// Step 4: Format for CV
		publications = formatPublications(publications);

		// Step 5: Update cv.json
		updateCvJson(publications);

		console.log('\nDone!');
		console.log(`Total publications: ${publications.length}`);

		// Show summary by year
		const byYear = {};
		for (const pub of publications) {
			byYear[pub.year] = (byYear[pub.year] || 0) + 1;
		}
		console.log('\nPublications by year:');
		for (const year of Object.keys(byYear).sort().reverse().slice(0, 10)) {
			console.log(`  ${year}: ${byYear[year]}`);
		}

	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

main();
