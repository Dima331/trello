import { action } from 'typesafe-actions';
import { Note } from '../../../types/Notes';

import { ColumnsTypes } from './types';

export function addColumn() {
  return action(ColumnsTypes.ADD_COLUMN);
}

export function deleteColumn(columnId: number) {
  return action(ColumnsTypes.DELETE_COLUMN, { columnId });
}

export function addToColumn(columnId: number, note: Note) {
  return action(ColumnsTypes.ADD_NOTE, { columnId, note });
}

export function deleteInColumn(columnId: number, noteId: number) {
  return action(ColumnsTypes.DELETE_NOTE, { columnId, noteId });
}

export function updateNote(columnId: number, note: Note) {
  return action(ColumnsTypes.UPDATE_NOTE, { columnId, note });
}

export function activeNote(columnId: number, noteId: number) {
  return action(ColumnsTypes.ACTIVE_NOTE, { columnId, noteId });
}

export function removeActiveNote() {
  return action(ColumnsTypes.REMOVE_ACTIVE_NOTE);
}

export function horizontalMovingNote(note: Note, activeColumnId: number, newColumnId: number) {
  return action(ColumnsTypes.HORIZONTAL_MOVING_NOTE, { note, activeColumnId, newColumnId });
}

export function verticalMovingNote(columnId: number, notes: Note[]) {
  return action(ColumnsTypes.VERTICAL_MOVING_NOTE, { columnId, notes });
}

export function insertNote(
  startingColumnId: number,
  startingColumn: Note[],
  endColumnId?: number,
  endColumn?: Note[],
) {
  return action(ColumnsTypes.INSERT_NOTE, {
    startingColumnId,
    startingColumn,
    endColumnId,
    endColumn,
  });
}
