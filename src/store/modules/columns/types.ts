import { ActionType } from 'typesafe-actions';
import * as columnsActions from './actions';

export enum ColumnsTypes {
  ADD_COLUMN = '@column/ADD_COLUMN',
  DELETE_COLUMN = '@column/DELETE_COLUMN',
  ADD_NOTE = '@column/ADD_NOTE',
  DELETE_NOTE = '@column/DELETE_NOTE',
  UPDATE_NOTE = '@column/UPDATE_NOTE',
  ACTIVE_NOTE = '@column/ACTIVE_NOTE',
  REMOVE_ACTIVE_NOTE = '@column/REMOVE_ACTIVE_NOTE',
  HORIZONTAL_MOVING_NOTE = '@column/HORIZONTAL_MOVING_NOTE',
  VERTICAL_MOVING_NOTE = '@column/VERTICAL_MOVING_NOTE',
  INSERT_NOTE = '@column/INSERT_NOTE',
  EXPIRED_NOTE = '@column/EXPIRED_NOTE',
}

export type ColumnsActions = ActionType<typeof columnsActions>;
