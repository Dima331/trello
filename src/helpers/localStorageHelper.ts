import { StoreState } from '../store/modules/combineReducers';

export function loadState(): StoreState | undefined {
  const json = (localStorage.getItem('state'));

  if (!json) {
    return;
  }

  const state = JSON.parse(json);

  state.column.future = [];
  state.column.past = [];

  return state;
}

export function saveState(state: StoreState): void {
  const json = JSON.stringify(state);

  localStorage.setItem('state', json);
}
