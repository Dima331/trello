import { action } from 'typesafe-actions';

import { Note } from '../../../types/Notes';

import {
  ModalTypes,
} from './types';

export function editOpenModal(columnId: number, note: Note) {
  return action(ModalTypes.EDIT_OPEN_MODAL, { columnId, note });
}

export function closeModal() {
  return action(ModalTypes.CLOSE_MODAL);
}

export function addNoteModal(columnId: number) {
  return action(ModalTypes.ADD_NOTE_MODAL, { columnId });
}
