# CV Website for Steven Weaver

## Project Overview
A personal CV/resume website built with SvelteKit, designed for deploying to stevenweaver.org/cv as a static site.

## Tech Stack
- **Framework**: SvelteKit with Svelte 5 (uses runes: `$props`, `$state`, `$derived`)
- **Language**: TypeScript
- **Adapter**: `@sveltejs/adapter-static` for static site generation
- **Base Path**: `/cv` (configured in `svelte.config.js`)

## Key Files

### Data
- `src/lib/data/cv.json` - All CV content (positions, education, publications, grants, etc.)
- `src/lib/types/cv.ts` - TypeScript interfaces for CV data

### Components
- `src/lib/components/cv/` - All CV section components
  - `Header.svelte` - Name, title, photo, bio
  - `Positions.svelte` - Work experience
  - `Education.svelte` - Degrees
  - `Publications.svelte` - Academic publications with stats banner
  - `Grants.svelte` - Funding/grants
  - `Software.svelte` - Software projects
  - `SideNav.svelte` - Sticky left navigation with scroll spy
  - `Section.svelte` - Reusable section wrapper

### Styles
- `src/app.css` - Global styles including print styles for PDF output
- Color scheme: Green accent (`#059669`), blue links (`#1d4ed8`)

## Common Commands
```bash
npm run dev      # Start dev server
npm run build    # Build static site to /build folder
npm run preview  # Preview production build
```

## Deployment
The `build/` folder contains the static site. Copy its contents to the `/cv` directory on stevenweaver.org.

## Important Notes
- Base path is `/cv` - all assets are served from this subdirectory
- Publications are sorted by year (descending)
- Print styles are optimized for PDF generation
- Headshot image: `static/images/headshot.jpg`
- The Header component imports `base` from `$app/paths` for the photo path

## CV Data Structure
Key sections in `cv.json`:
- `personal` - Name, title, bio, contact info, photo path
- `positions` - Work history (title, org, dates, highlights)
- `education` - Degrees with dissertation info
- `publications` - Academic papers with authors, DOI, PMID
- `publicationStats` - Citation counts, h-index, etc.
- `grants` - Funding (title, agency, role, dates)
- `software` - Software projects
- `professionalActivities` - Committee work, consulting
- `courses` - Teaching experience
- `workshops` - Workshop instruction

## GitHub
Repository: https://github.com/stevenweaver/cv-web
