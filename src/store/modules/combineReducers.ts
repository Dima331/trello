import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import notes from './notes/reducer';
import modal from './modal/reducer';
import column from './columns/reducer';
import cover from './cover/reducer';

import {
  ColumnsTypes,
} from './columns/types';

import {
  NotesTypes,
} from './notes/types';

const rootReducer = combineReducers({
  modal,
  cover,
  group: undoable((combineReducers({
    column,
    notes,
  })), {
    limit: 5,
    filter: includeAction([
      NotesTypes.CREATE_NOTE,
      NotesTypes.DELETE_NOTE,
      NotesTypes.HORIZONTAL_MOVING_NOTE,
      NotesTypes.VERTICAL_MOVING_NOTE,
      NotesTypes.UPDATE_NOTE,
      ColumnsTypes.ADD_COLUMN,
      ColumnsTypes.DELETE_COLUMN]),
  }),
});

export type StoreState = ReturnType<typeof rootReducer>;
export default rootReducer;
