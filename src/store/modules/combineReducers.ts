import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import modal from './modal/reducer';
import column from './columns/reducer';
import background from './background/reducer';
import image from './image/reducer';

import { ColumnsTypes } from './columns/types';

const rootReducer = combineReducers({
  modal,
  background,
  image,
  column: undoable(column, {
    limit: 5,
    filter: includeAction([
      ColumnsTypes.ADD_NOTE,
      ColumnsTypes.DELETE_NOTE,
      ColumnsTypes.UPDATE_NOTE,
      ColumnsTypes.HORIZONTAL_MOVING_NOTE,
      ColumnsTypes.VERTICAL_MOVING_NOTE,
      ColumnsTypes.ADD_COLUMN,
      ColumnsTypes.DELETE_COLUMN,
      ColumnsTypes.INSERT_NOTE]),
  }),
});

export type StoreState = ReturnType<typeof rootReducer>;
export default rootReducer;
