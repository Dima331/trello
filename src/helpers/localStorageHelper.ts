import { StoreState } from '../store/modules/combineReducers';

export const loadState = (): StoreState | undefined => {
  const json = (localStorage.getItem('state'));

  if (!json) {
    return;
  }

  const state = JSON.parse(json);

  state.group.future = [];
  state.group.past = [];

  return state;
};

export const saveState = (state: StoreState): void => {
  const json = JSON.stringify(state);

  localStorage.setItem('state', json);
};
