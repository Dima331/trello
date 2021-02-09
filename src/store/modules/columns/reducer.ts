import { setLocalStorage, getLocalStorage } from '../../../helpers/localStorageHelper';

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
      setLocalStorage('columns', [...state.columns, action.payload.column]);

      return {
        columns: [...state.columns, action.payload.column],
      };
    case ColumnsTypes.DELETE_COLUMN: {
      const columns = state.columns.filter(
        (column) => (
          column.id !== action.payload.column.id),
      );

      setLocalStorage('columns', columns);

      return { columns };
    }
    case ColumnsTypes.GET_COLUMNS: {
      const columns = getLocalStorage('columns');

      if (columns && columns.length !== 0) {
        return {
          columns,
        };
      }

      setLocalStorage('columns', state.columns);

      return state;
    }
    default:
      return state;
  }
}
