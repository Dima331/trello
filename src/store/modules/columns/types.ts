export interface Column {
    id: number;
}

export interface Columns {
    columns: Column[]
}

export const ADD_COLUMN = '@column/ADD_COLUMN';
export const DELETE_COLUMN = '@column/DELETE_COLUMN';

interface AddColumn {
    type: typeof ADD_COLUMN;
    payload: { column: Column };
}

interface DeleteColumn {
    type: typeof DELETE_COLUMN;
    payload: { column: Column };
}

export type ColumnActionsTypes =
    | AddColumn
    | DeleteColumn;
