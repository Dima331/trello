export interface Note {
	id: number;
	title: string;
	description: string;
	color: string,
	active?: boolean;
	marker: string;
	date?: Date | null;
	image?: string;
	time?:  boolean;
}
