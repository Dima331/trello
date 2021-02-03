import {
    ColumnActionsTypes,
    Columns,
    ADD_COLUMN,
    DELETE_COLUMN,
} from './types';

const initialState: Columns = {
    columns: [
        {
            id: 1
        }
    ],
};

export default function notesReducer(
    state = initialState,
    action: ColumnActionsTypes
): Columns {
    switch (action.type) {
        case ADD_COLUMN:
            return {
                columns: [...state.columns, action.payload.column],
            };
        case DELETE_COLUMN: {
            const columns = state.columns.filter(
                column => column.id !== action.payload.column.id
            );

            return { columns };
        }
        default:
            return state;
    }
}
