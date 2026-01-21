import type { CVData } from '$lib/types/cv';
import cvData from '$lib/data/cv.json';

export function load() {
	return {
		cv: cvData as CVData
	};
}
