export interface Note {
	id: number;
	title: string;
	description: string;
	color: string,
	columnId?: number;
	active?: boolean;
}
