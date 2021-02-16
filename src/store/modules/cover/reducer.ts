import {
  CoverActions,
  CoverTypes,
} from './types';

export interface CoverState {
  cover: number;
  isLoadingCover?: boolean;
}

const initialState: CoverState = {
  cover: 1,
  isLoadingCover: true,
};

export default function coverReducer(
  state = initialState,
  action: CoverActions,
): CoverState {
  switch (action.type) {
    case CoverTypes.CHANGE_IMAGE: {
      return { cover: action.payload.cover };
    }

    default:
      return state;
  }
}
