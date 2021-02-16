import { ActionType } from 'typesafe-actions';
import * as coverActions from './actions';

export type CoverActions = ActionType<typeof coverActions>;

export interface Cover {
  cover: number;
}

export enum CoverTypes {
  CHANGE_IMAGE = '@cover/CHANGE_IMAGE',
}
