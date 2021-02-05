import { combineReducers } from 'redux';
import notes from './notes/reducer';
import modal from './modal/reducer';
import column from './columns/reducer';

const rootReducer = combineReducers({
  notes,
  modal,
  column,
});

export type StoreState = ReturnType<typeof rootReducer>;
export default rootReducer;
