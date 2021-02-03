export interface Notes {
  id: number;
  title: string;
  description: string;
  columnId?: number;
}

export interface NotesState {
  data: Notes[];
}

export const CREATE_NOTE = '@note/CREATE_NOTE';
export const UPDATE_NOTE = '@note/UPDATE_NOTE';
export const DELETE_NOTE = '@note/DELETE_NOTE';
export const DELETE_NOTES_IN_COLUMN = '@note/DELETE_NOTES_IN_COLUMN';

interface CreateNote {
  type: typeof CREATE_NOTE;
  payload: { note: Notes };
}

interface UpdateNote {
  type: typeof UPDATE_NOTE;
  payload: { note: Notes };
}

interface DeleteNote {
  type: typeof DELETE_NOTE;
  payload: { note: Notes };
}

interface DeleteNotesInColumn {
  type: typeof DELETE_NOTES_IN_COLUMN;
  payload: { columnId: number };
}

export type NotesActionsTypes =
  | CreateNote
  | UpdateNote
  | DeleteNote
  | DeleteNotesInColumn;
