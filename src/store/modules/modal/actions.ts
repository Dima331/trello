import { action } from 'typesafe-actions';
import {
  Note,
  ModalTypes,
} from './types';

export const editOpenModal = (note?: Note) => {
  return action(ModalTypes.EDIT_OPEN_MODAL, { note });
};

export function closeModal() {
  return action(ModalTypes.CLOSE_MODAL);
}

export function addNoteModal(column: number) {
  return action(ModalTypes.ADD_NOTE_MODAL, { column });
}
