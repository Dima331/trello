import {
  BackgroundActions,
  BackgroundTypes,
} from './types';

export interface BackgroundState {
  background?: number;
}

const initialState: BackgroundState = {};

export default function backgroundReducer(
  state = initialState,
  action: BackgroundActions,
): BackgroundState {
  switch (action.type) {
    case BackgroundTypes.CHANGE_IMAGE: {
      return { background: action.payload.background };
    }

    default:
      return state;
  }
}
