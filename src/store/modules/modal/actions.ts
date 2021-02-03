import {
    ModalActionsTypes,
    Note,
    OPEN_MODAL,
    CLOSE_MODAL,
    ACTIVE_COLUMN_MODAL,
    IColumn,
} from './types';

export function openModal(note?: Note): ModalActionsTypes {
    if (note) {
        return {
            type: OPEN_MODAL,
            payload: { note },
        };
    }
    return {
        type: OPEN_MODAL,
    };
}

export function closeModal(): ModalActionsTypes {
    return {
        type: CLOSE_MODAL,
    };
}

export function activeColumnModal(column: IColumn): ModalActionsTypes {
    return {
        type: ACTIVE_COLUMN_MODAL,
        payload: { column },
    };
}

