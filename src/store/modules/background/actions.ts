import { action } from 'typesafe-actions';
import { BackgroundTypes } from './types';

export function changeImage(background: number) {
  return action(BackgroundTypes.CHANGE_IMAGE, { background });
}
