import { ActionType } from 'typesafe-actions';
import * as modalActions from './actions';

export interface Note {
  id: number;
  title: string;
  description: string;
  columnId?: number;
  color: string;
}

export enum ModalTypes {
  EDIT_OPEN_MODAL = '@modal/EDIT_OPEN_MODAL',
  CLOSE_MODAL = '@modal/CLOSE_MODAL',
  ADD_NOTE_MODAL = '@modal/ADD_NOTE_MODAL',
}

export type ModalActions = ActionType<typeof modalActions>;
