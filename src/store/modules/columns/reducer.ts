import { getLastIdColumns } from '../../../helpers/actionIdHelper';
import { Column } from '../../../types/Columns';

import {
  ColumnsActions,
  ColumnsTypes,
} from './types';

interface ColumnsState {
  columns: Column[];
  isLoadingColumns?: boolean;
}

const initialState: ColumnsState = {
  columns: [
    {
      id: 1,
    },
  ],
  isLoadingColumns: true,
};

export default function columnReducer(
  state = initialState,
  action: ColumnsActions,
): ColumnsState {
  switch (action.type) {
    case ColumnsTypes.ADD_COLUMN: {
      const lastId = getLastIdColumns(state.columns);

      return {
        columns: [...state.columns, {
          id: lastId,
        }],
      };
    }
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
