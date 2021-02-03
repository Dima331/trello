export interface Note {
    id: number;
    title: string;
    description: string;
    columnId?: number;
}

export interface Modal {
    state?: boolean;
    note?: Note;
    columnId?: IColumn;
}

export interface IColumn {
    columnId: number;
}

export const OPEN_MODAL = '@modal/OPEN_MODAL';
export const CLOSE_MODAL = '@modal/CLOSE_MODAL';
export const ACTIVE_COLUMN_MODAL = '@modal/ACTIVE_COLUMN_MODAL';

interface OpenModal {
    type: typeof OPEN_MODAL;
    payload?: { note: Note };
}

interface CloseModal {
    type: typeof CLOSE_MODAL;
}

interface ActiveColumnModal {
    type: typeof ACTIVE_COLUMN_MODAL;
    payload?: { column: IColumn };
}

export type ModalActionsTypes =
    | OpenModal
    | CloseModal
    | ActiveColumnModal;
