import { Note } from '../../../types/Notes';

import {
  ModalActions,
  ModalTypes,
} from './types';

export interface ModalState {
  isModalOpen?: boolean;
  note?: Note;
  columnId?: number;
}

const initialState: ModalState = {
  isModalOpen: false,
  note: {} as Note,
  columnId: undefined,
};

export default function modalReducer(
  state = initialState,
  action: ModalActions,
): ModalState {
  switch (action.type) {
    case ModalTypes.EDIT_OPEN_MODAL:
      return {
        columnId: action.payload.columnId,
        note: action.payload.note,
        isModalOpen: true,
      };
    case ModalTypes.CLOSE_MODAL: {
      return {
        isModalOpen: false,
      };
    }
    case ModalTypes.ADD_NOTE_MODAL: {
      return {
        columnId: action.payload.columnId,
        isModalOpen: true,
      };
    }
    default:
      return state;
  }
}
