import { Column } from '../types/Columns';
import { Note } from '../types/Notes';

export enum MovementDirection {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
}

export interface VerticalDirections {
  isMovementAvailable: (notes: Note[], note: Note) => boolean;
  getNotes: (notes: Note[], index: number) => Note[];
}

export interface HorizontalDirections {
  isMovementAvailable: (columnId: number, columns: Column[]) => boolean;
  getNewColumnId: (columnId: number, columns: Column[]) => number;
}

type Directions = HorizontalDirections | VerticalDirections;

export const MovementDirectionConfig: Record<MovementDirection, Directions> = {
  [MovementDirection.Left]: {
    isMovementAvailable: (columnId: number, columns: Column[]): boolean => (
      columns[0].id < columnId
    ),
    getNewColumnId: (columnId: number, columns: Column[]): number => {
      const activeColumnIndex = columns.findIndex((column) => column.id === columnId);

      return columns[activeColumnIndex - 1].id;
    },
  },
  [MovementDirection.Right]: {
    isMovementAvailable: (columnId: number, columns: Column[]): boolean => (
      columns[columns.length - 1].id > columnId
    ),
    getNewColumnId: (columnId: number, columns: Column[]): number => {
      const activeColumnIndex = columns.findIndex((column) => column.id === columnId);

      return columns[activeColumnIndex + 1].id;
    },
  },
  [MovementDirection.Up]: {
    isMovementAvailable: (notes: Note[], note: Note): boolean => (
      notes[0].id !== note.id
    ),
    getNotes: (notes: Note[], index: number): Note[] => {
      notes[index] = notes.splice((index - 1), 1, notes[index])[0];

      return notes;
    },
  },
  [MovementDirection.Down]: {
    isMovementAvailable: (notes: Note[], note: Note): boolean => (
      notes[notes.length - 1].id !== note.id
    ),
    getNotes: (notes: Note[], index: number): Note[] => {
      notes[index] = notes.splice((index + 1), 1, notes[index])[0];

      return notes;
    },
  },
};
