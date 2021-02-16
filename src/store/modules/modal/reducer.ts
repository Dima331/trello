import {
  ModalActions,
  Note,
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
        isModalOpen: true,
        note: action.payload.note,
      };
    case ModalTypes.CLOSE_MODAL: {
      return {
        isModalOpen: false,
      };
    }
    case ModalTypes.ADD_NOTE_MODAL: {
      return {
        isModalOpen: true,
        columnId: action.payload.column,
      };
    }
    default:
      return state;
  }
}
