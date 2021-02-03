import {
    ColumnActionsTypes,
    Column,
    ADD_COLUMN,
    DELETE_COLUMN,
  } from './types';
  
  export function addColumn(column: Column): ColumnActionsTypes {
    return {
      type: ADD_COLUMN,
      payload: { column },
    };
  }
  
  export function deleteColumn(column: Column): ColumnActionsTypes {
    return {
      type: DELETE_COLUMN,
      payload: { column },
    };
  }
  
