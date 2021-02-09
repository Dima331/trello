import { ActionType } from 'typesafe-actions';
import * as notesActions from './actions';

export type NotesActions = ActionType<typeof notesActions>;

export interface Note {
  id: number;
  title: string;
  description: string;
  color: string,
  columnId?: number;
  active?: boolean;
}

export enum NotesTypes{
  CREATE_NOTE = '@note/CREATE_NOTE',
  UPDATE_NOTE = '@note/UPDATE_NOTE',
  DELETE_NOTE = '@note/DELETE_NOTE',
  DELETE_NOTES_IN_COLUMN = '@note/DELETE_NOTES_IN_COLUMN',
  GET_NOTES = '@note/GET_NOTES',
  ACTIVE_NOTE = '@note/ACTIVE_NOTE',
  SHIFT_LEFT_RIGHT_NOTE = '@note/SHIFT_LEFT_RIGHT_NOTE',
  SHIFT_UP_DOWN_NOTE = '@note/SHIFT_UP_DOWN_NOTE',
}
