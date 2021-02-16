import { ActionType } from 'typesafe-actions';
import * as notesActions from './actions';

export type NotesActions = ActionType<typeof notesActions>;

export enum NotesTypes{
  CREATE_NOTE = '@note/CREATE_NOTE',
  UPDATE_NOTE = '@note/UPDATE_NOTE',
  DELETE_NOTE = '@note/DELETE_NOTE',
  DELETE_NOTES_IN_COLUMN = '@note/DELETE_NOTES_IN_COLUMN',
  ACTIVE_NOTE = '@note/ACTIVE_NOTE',
  REMOVE_ACTIVE_NOTE = '@note/REMOVE_ACTIVE_NOTE',
  HORIZONTAL_MOVING_NOTE = '@note/HORIZONTAL_MOVING_NOTE',
  VERTICAL_MOVING_NOTE = '@note/VERTICAL_MOVING_NOTE',
}
