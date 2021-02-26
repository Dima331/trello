import {
  ImageActions,
  ImageTypes,
} from './types';

export interface Image {
  image: string;
  isLoading: boolean;
  error?: string;
}

const initialState: Image = {
  image: '',
  isLoading: false,
  error: '',
};

export default function imageReducer(
  state = initialState,
  action: ImageActions,
): Image {
  switch (action.type) {
    case ImageTypes.FETCH_IMAGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ImageTypes.FETCH_IMAGE_SUCCESS: {
      return {
        image: action.payload.image,
        isLoading: false,
      };
    }
    case ImageTypes.FETCH_IMAGE_FAILURE: {
      return {
        ...state,
        error: 'error',
        isLoading: false,
      };
    }
    case ImageTypes.REMOVE_IMAGE: {
      return {
        image: '',
        isLoading: false,
      };
    }
    case ImageTypes.ADD_EDIT_IMAGE: {
      return {
        image: action.payload.image,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
