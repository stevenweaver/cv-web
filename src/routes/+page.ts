import type { CVData } from '$lib/types/cv';
import cvData from '$lib/data/cv.json';

export const prerender = true;

export function load() {
	return {
		cv: cvData as CVData
	};
}
