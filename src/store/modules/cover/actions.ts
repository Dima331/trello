import { action } from 'typesafe-actions';
import {
  CoverTypes,
} from './types';

export const changeImage = (cover: number) => {
  return action(CoverTypes.CHANGE_IMAGE, { cover });
};
