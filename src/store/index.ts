import { createStore, compose, applyMiddleware } from 'redux';

import reducer from './modules/combineReducers';
import { ColumnsMiddleware } from './modules/columns/middleware';

const store = createStore(reducer, applyMiddleware(ColumnsMiddleware));

export default store;
