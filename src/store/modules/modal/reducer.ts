import {
  ModalActions,
  Note,
  ModalTypes,
} from './types';

export interface ModalType {
  isModalOpen?: boolean;
  note?: Note;
  columnId?: number;
}

const initialState: ModalType = {
  isModalOpen: false,
  note: {
    id: 0,
    title: '',
    description: '',
    columnId: 1,
    color: '',
  },
  columnId: undefined,
};

export default function notesReducer(
  state = initialState,
  action: ModalActions,
): ModalType {
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
