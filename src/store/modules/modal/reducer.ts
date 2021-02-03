import { Column } from '../columns/types';
import {
    ModalActionsTypes,
    Modal,
    OPEN_MODAL,
    CLOSE_MODAL,
    ACTIVE_COLUMN_MODAL
} from './types';

const initialState: Modal = {
    state: false,
    note: {
        id: 0,
        title: '',
        description: '',
        columnId: 1
    },
    columnId: undefined,
};

export default function notesReducer(
    state = initialState,
    action: ModalActionsTypes
): Modal {
    switch (action.type) {
        case OPEN_MODAL:
            if (action.payload) {
                return {
                    state: true,
                    note: action.payload.note
                }
            }

            return {
                state: true
            }
        case CLOSE_MODAL: {
            return {
                state: false
            }
        }
        case ACTIVE_COLUMN_MODAL: {
            if (action.payload) {
                return {
                    state: true,
                    columnId: action.payload.column
                }
            }
            return {
                state: true
            }
        }

        default:
            return state;
    }
}
