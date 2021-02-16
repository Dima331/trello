import { ActionType } from 'typesafe-actions';
import * as columnsActions from './actions';

export enum ColumnsTypes {
  ADD_COLUMN = '@column/ADD_COLUMN',
  DELETE_COLUMN = '@column/DELETE_COLUMN',
}

export type ColumnsActions = ActionType<typeof columnsActions>;
