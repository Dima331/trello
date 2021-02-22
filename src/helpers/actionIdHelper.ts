import { Column } from '../types/Columns';

export function getLastIdColumns(columns: Column[]): number {
  return columns[columns.length - 1] ? columns[columns.length - 1].id + 1 : 1;
}

export function getLastIdNotes(columns: Column[]): number {
  let maxId = 1;

  columns.forEach((column) => {
    column.notes.forEach((noteItem) => {
      if (noteItem.id > maxId) {
        maxId = noteItem.id;
      }
    });
  });

  maxId += 1;

  return maxId;
}
