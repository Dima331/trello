import { ActionType } from 'typesafe-actions';
import * as imageActions from './actions';

export enum ImageTypes {
  FETCH_IMAGE_REQUEST = '@image/FETCH_IMAGE_REQUEST',
  FETCH_IMAGE_SUCCESS = '@image/FETCH_IMAGE_SUCCESS',
  FETCH_IMAGE_FAILURE = '@image/FETCH_IMAGE_FAILURE',
  REMOVE_IMAGE = '@image/REMOVE_IMAGE',
  ADD_EDIT_IMAGE = '@image/ADD_EDIT_IMAGE',
}

export type ImageActions = ActionType<typeof imageActions>;
