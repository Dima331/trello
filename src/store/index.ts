import { createStore } from 'redux';

import reducer from './modules/combineReducers';
import { loadState, saveState } from '../helpers/localStorageHelper';

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
