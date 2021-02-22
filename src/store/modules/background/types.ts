import { ActionType } from 'typesafe-actions';
import * as backgroundActions from './actions';

export interface Background {
  background: number;
}

export enum BackgroundTypes {
  CHANGE_IMAGE = '@background/CHANGE_IMAGE',
}

export type BackgroundActions = ActionType<typeof backgroundActions>;
