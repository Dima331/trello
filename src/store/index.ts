import { createStore, applyMiddleware } from 'redux';

import reducer from './modules/combineReducers';
import { loadState, saveState } from '../helpers/localStorageHelper';
import getUrlImageMiddleware from './modules/image/middlewares';

const persistedState = loadState();

const store = createStore(reducer, persistedState, applyMiddleware(getUrlImageMiddleware));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
