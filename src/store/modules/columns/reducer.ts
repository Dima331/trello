import {
  ColumnsActions,
  Column,
  ColumnsTypes,
} from './types';

interface ColumnsType {
  columns: Column[]
}

const initialState: ColumnsType = {
  columns: [
    {
      id: 1,
    },
  ],
};

export default function notesReducer(
  state = initialState,
  action: ColumnsActions,
): ColumnsType {
  switch (action.type) {
    case ColumnsTypes.ADD_COLUMN:
      return {
        columns: [...state.columns, action.payload.column],
      };
    case ColumnsTypes.DELETE_COLUMN: {
      const columns = state.columns.filter(
        (column) => (
          column.id !== action.payload.column.id),
      );

      return { columns };
    }
    default:
      return state;
  }
}
