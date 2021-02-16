import { Column } from '../types/Columns';
import { Note } from '../types/Notes';

export function getLastIdColumns(columns: Column[]): number {
  return columns[columns.length - 1] ? columns[columns.length - 1].id + 1 : 1;
}

export function getLastIdNotes(notes: Note[]): number {
  let maxId = 1;

  notes.forEach((noteItem: Note) => {
    if (noteItem.id > maxId) {
      maxId = noteItem.id;
    }
  });

  maxId += 1;

  return maxId;
}
