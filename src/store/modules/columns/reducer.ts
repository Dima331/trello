import { getLastIdColumns } from '../../../helpers/actionIdHelper';
import { Column } from '../../../types/Columns';

import {
  ColumnsActions,
  ColumnsTypes,
} from './types';

interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [
    {
      id: 1,
      notes: [
        {
          id: 1,
          title: '111',
          description: '111',
          color: 'green',
          active: false,
        },
      ],
    },
  ],
};

export default function columnReducer(
  state = initialState,
  action: ColumnsActions,
): ColumnsState {
  switch (action.type) {
    case ColumnsTypes.ADD_COLUMN: {
      const lastId = getLastIdColumns(state.columns);

      return {
        columns: [
          ...state.columns, {
            id: lastId,
            notes: [],
          }],
      };
    }
    case ColumnsTypes.DELETE_COLUMN: {
      const columns = state.columns
        .filter((column) => (
          column.id !== action.payload.columnId));

      return { columns };
    }
    case ColumnsTypes.ADD_NOTE: {
      const columns = state.columns
        .map((column) => {
          if (column.id === action.payload.columnId) {
            return {
              id: column.id,
              notes: [
                ...column.notes,
                action.payload.note,
              ],
            };
          }

          return column;
        });

      return { columns };
    }
    case ColumnsTypes.DELETE_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          if (columnsItem.id === action.payload.columnId) {
            const notes = columnsItem.notes
              .filter((note) => (
                note.id !== action.payload.noteId));

            return {
              id: columnsItem.id,
              notes,
            };
          }

          return columnsItem;
        });

      return { columns };
    }
    case ColumnsTypes.UPDATE_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          if (columnsItem.id === action.payload.columnId) {
            const notes = columnsItem.notes
              .map((note) => {
                if (note.id === action.payload.note.id) {
                  return action.payload.note;
                }

                return note;
              });

            return {
              id: columnsItem.id,
              notes,
            };
          }

          return columnsItem;
        });

      return { columns };
    }
    case ColumnsTypes.ACTIVE_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          if (columnsItem.id === action.payload.columnId) {
            const notes = columnsItem.notes
              .map((note) => {
                if (note.id === action.payload.noteId) {
                  note.active = true;
                  return note;
                }
                note.active = false;

                return note;
              });

            return {
              id: columnsItem.id,
              notes,
            };
          }

          return columnsItem;
        });

      return { columns };
    }
    case ColumnsTypes.REMOVE_ACTIVE_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          const notes = columnsItem.notes
            .map((note) => {
              note.active = false;
              return note;
            });
          return {
            id: columnsItem.id,
            notes,
          };
        });

      return { columns };
    }
    case ColumnsTypes.HORIZONTAL_MOVING_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          if (columnsItem.id === action.payload.activeColumnId) {
            const notes = columnsItem.notes
              .filter((note) => (
                note.id !== action.payload.note.id));

            return {
              id: columnsItem.id,
              notes,
            };
          }
          if (columnsItem.id === action.payload.newColumnId) {
            action.payload.note.active = true;

            return {
              id: columnsItem.id,
              notes: [
                ...columnsItem.notes,
                action.payload.note,
              ],
            };
          }

          return columnsItem;
        });

      return { columns };
    }
    case ColumnsTypes.VERTICAL_MOVING_NOTE: {
      const columns = state.columns
        .map((columnsItem) => {
          if (columnsItem.id === action.payload.columnId) {
            return {
              id: action.payload.columnId,
              notes: action.payload.notes,
            };
          }

          return columnsItem;
        });

      return { columns };
    }
    case ColumnsTypes.INSERT_NOTE: {
      const columns = state.columns.map((column) => {
        if (column.id === action.payload.startingColumnId) {
          return {
            id: column.id,
            notes: action.payload.startingColumn,
          };
        }
        if (action.payload.endColumnId && action.payload.endColumn) {
          if (column.id === action.payload.endColumnId) {
            return {
              id: column.id,
              notes: action.payload.endColumn,
            };
          }
        }

        return column;
      });

      return { columns };
    }
    default:
      return state;
  }
}
