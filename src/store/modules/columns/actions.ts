import { action } from 'typesafe-actions';
import { Column } from '../../../types/Columns';

import { ColumnsTypes } from './types';

export function addColumn() {
  return action(ColumnsTypes.ADD_COLUMN);
}

export function deleteColumn(column: Column) {
  return action(ColumnsTypes.DELETE_COLUMN, { column });
}
