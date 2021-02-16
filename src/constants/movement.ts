import { Column } from '../types/Columns';
import { Note } from '../types/Notes';

export enum MovementDirection {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
}

interface Directions {
  isMovement?: (columns: Column[], note: Note) => boolean;
  getNewNote?: (columns: Column[], note: Note) => Column;
  isMovementAvailable?: (columnId: number, columns: Column[]) => boolean;
  getNewColumnId?:(columnId: number, columns: Column[]) => number;
}

export const MovementDirectionConfig: Record<MovementDirection, Directions> = {
  [MovementDirection.Left]: {
    isMovementAvailable: (columnId: number, columns: Column[]) => (
      columns[0].id < columnId
    ),
    getNewColumnId: (columnId: number, columns: Column[]) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === columnId);
      return columns[activeColumnIndex - 1].id;
    },
  },
  [MovementDirection.Right]: {
    isMovementAvailable: (columnId: number, columns: Column[]) => (
      columns[columns.length - 1].id > columnId
    ),
    getNewColumnId: (columnId: number, columns: Column[]) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === columnId);
      return columns[activeColumnIndex + 1].id;
    },
  },
  [MovementDirection.Up]: {
    isMovement: (columns: Column[], note: Note) => (
      columns[0].id !== note.id
    ),
    getNewNote: (columns: Column[], note: Note) => {
      let changeIndex: number = 0;

      columns.forEach((noteItem, index) => {
        if (noteItem.id === note.id) {
          changeIndex = index;
        }
      });

      return columns[changeIndex - 1];
    },
  },
  [MovementDirection.Down]: {
    isMovement: (columns: Column[], note: Note) => (
      columns[columns.length - 1].id !== note.id
    ),
    getNewNote: (columns: Column[], note: Note) => {
      let changeIndex: number = 0;

      columns.forEach((noteItem, index) => {
        if (noteItem.id === note.id) {
          changeIndex = index;
        }
      });

      return columns[changeIndex + 1];
    },
  },
};
