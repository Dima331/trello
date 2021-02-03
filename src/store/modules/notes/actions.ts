import {
  NotesActionsTypes,
  Notes,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  DELETE_NOTES_IN_COLUMN,
} from './types';

export function createNote(note: Notes): NotesActionsTypes {
  return {
    type: CREATE_NOTE,
    payload: { note },
  };
}

export function updateNote(note: Notes): NotesActionsTypes {
  return {
    type: UPDATE_NOTE,
    payload: { note },
  };
}

export function deleteNote(note: Notes): NotesActionsTypes {
  return {
    type: DELETE_NOTE,
    payload: { note },
  };
}

export function deleteNoteInColumn(columnId: number): NotesActionsTypes {
  return {
    type: DELETE_NOTES_IN_COLUMN,
    payload: { columnId },
  };
}
