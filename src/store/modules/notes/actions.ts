import { action } from 'typesafe-actions';
import { Note } from '../../../types/Notes';

import {
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

export function activeNote(noteId: number) {
  return action(NotesTypes.ACTIVE_NOTE, { noteId });
}

export function removeActiveNote() {
  return action(NotesTypes.REMOVE_ACTIVE_NOTE);
}

export function horizontalMovingNote(note: Note, columnId: number) {
  return action(NotesTypes.HORIZONTAL_MOVING_NOTE, { note, columnId });
}

export function verticalMovingNote(note: Note, noteExchange: Note) {
  return action(NotesTypes.VERTICAL_MOVING_NOTE, { note, noteExchange });
}
