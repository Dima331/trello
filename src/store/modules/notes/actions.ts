import { action } from 'typesafe-actions';
import {
  Note,
  NotesTypes,
} from './types';

export function createNote(note: Note) {
  return action(NotesTypes.CREATE_NOTE, { note });
}

export function updateNote(note: Note) {
  return action(NotesTypes.UPDATE_NOTE, { note });
}

export function deleteNote(note: Note) {
  return action(NotesTypes.DELETE_NOTE, { note });
}

export function deleteNoteInColumn(columnId: number) {
  return action(NotesTypes.DELETE_NOTES_IN_COLUMN, { columnId });
}
