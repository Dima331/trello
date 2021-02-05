import { ActionType } from 'typesafe-actions';
import * as notesActions from './actions';

export type NotesActions = ActionType<typeof notesActions>;

export interface Note {
  id: number;
  title: string;
  description: string;
  color: string,
  columnId?: number;
}

export enum NotesTypes{
  CREATE_NOTE = '@note/CREATE_NOTE',
  UPDATE_NOTE = '@note/UPDATE_NOTE',
  DELETE_NOTE = '@note/DELETE_NOTE',
  DELETE_NOTES_IN_COLUMN = '@note/DELETE_NOTES_IN_COLUMN',
}
