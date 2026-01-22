export interface ContactLinks {
	email?: string;
	website?: string;
	github?: string;
	twitter?: string;
	googleScholar?: string;
	linkedin?: string;
	orcid?: string;
}

export interface PersonalInfo {
	name: string;
	title: string;
	photo?: string;
	bio?: string;
	researchInterests?: string[];
	contact: ContactLinks;
}

export interface Position {
	title: string;
	organization: string;
	location?: string;
	startDate: string;
	endDate?: string;
	description?: string;
	highlights?: string[];
}

export interface Education {
	degree: string;
	field: string;
	institution: string;
	location?: string;
	startDate?: string;
	endDate?: string;
	dissertation?: string;
	dissertationUrl?: string;
	advisor?: string;
	gpa?: string;
}

export interface Award {
	title: string;
	organization?: string;
	year?: string;
	description?: string;
}

export interface Talk {
	title: string;
	event: string;
	location: string;
	year: string;
	type?: 'talk' | 'poster' | 'keynote' | 'invited';
}

export interface ProfessionalActivity {
	role: string;
	organization: string;
	startDate?: string;
	endDate?: string;
	description?: string;
}

export interface Grant {
	title: string;
	agency: string;
	role: string;
	amount?: string;
	startDate?: string;
	endDate?: string;
	status?: 'active' | 'completed' | 'pending';
	pi?: string;
	description?: string;
}

export interface Publication {
	title: string;
	authors: string[];
	journal?: string;
	volume?: string;
	issue?: string;
	pages?: string;
	year: string;
	doi?: string;
	pmid?: string;
	url?: string;
	citations?: number;
	type?: 'journal' | 'conference' | 'preprint' | 'book' | 'chapter';
}

export interface PublicationStats {
	totalPublications?: number;
	totalCitations?: number;
	hIndex?: number;
	weightedRCR?: number;
	googleScholarUrl?: string;
	nihIciteUrl?: string;
}

export interface Software {
	name: string;
	description: string;
	url?: string;
	github?: string;
	technologies?: string[];
	role?: string;
}

export interface Course {
	code?: string;
	title: string;
	institution: string;
	role: string;
	semesters?: string[];
	description?: string;
}

export interface Workshop {
	title: string;
	role: string;
	location?: string;
	date?: string;
	description?: string;
	url?: string;
}

export interface Mentee {
	name: string;
	degree?: string;
	institution?: string;
	period?: string;
	currentPosition?: string;
	coAdvisors?: string[];
}

export interface CVData {
	personal: PersonalInfo;
	positions?: Position[];
	education?: Education[];
	awards?: Award[];
	talks?: Talk[];
	professionalActivities?: ProfessionalActivity[];
	grants?: Grant[];
	publications?: Publication[];
	publicationStats?: PublicationStats;
	software?: Software[];
	courses?: Course[];
	workshops?: Workshop[];
	mentoring?: Mentee[];
	skills?: string[];
}
