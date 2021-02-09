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

export function getNotes() {
  return action(NotesTypes.GET_NOTES);
}

export function activeNote(noteId: number) {
  return action(NotesTypes.ACTIVE_NOTE, { noteId });
}

export function shiftLeftRightNote(note: Note, columnId: number) {
  return action(NotesTypes.SHIFT_LEFT_RIGHT_NOTE, { note, columnId });
}

export function shiftUpDownNote(note: Note, noteExchange: Note) {
  return action(NotesTypes.SHIFT_UP_DOWN_NOTE, { note, noteExchange });
}
