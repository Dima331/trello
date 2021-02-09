import { action } from 'typesafe-actions';
import {
  Column,
  ColumnsTypes,
} from './types';

export function addColumn(column: Column) {
  return action(ColumnsTypes.ADD_COLUMN, { column });
}

export function deleteColumn(column: Column) {
  return action(ColumnsTypes.DELETE_COLUMN, { column });
}

export function getColumns() {
  return action(ColumnsTypes.GET_COLUMNS);
}
