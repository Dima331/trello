import { action } from 'typesafe-actions';
import { ImageTypes } from './types';

export function fetchImageRequest(image: File) {
  return action(ImageTypes.FETCH_IMAGE_REQUEST, { image });
}

export function fetchImageSuccess(image: string) {
  return action(ImageTypes.FETCH_IMAGE_SUCCESS, { image });
}

export function fetchImageFailure() {
  return action(ImageTypes.FETCH_IMAGE_FAILURE, {});
}

export function removeImage() {
  return action(ImageTypes.REMOVE_IMAGE, {});
}

export function addEditImage(image: string) {
  return action(ImageTypes.ADD_EDIT_IMAGE, { image });
}
