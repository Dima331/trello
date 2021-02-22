import { DropResult } from 'react-beautiful-dnd';
import { Note } from '../types/Notes';
import { Column } from '../types/Columns';

import store from '../store';
import { insertNote } from '../store/modules/columns/actions';

class NoteDragService {
  public dragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const startingColumn = this.getNotesInColumn(source.droppableId);
      const endColumn = this.getNotesInColumn(destination.droppableId);

      const startingNotes = this.getCopyNotes(startingColumn.notes);
      const endNotes = this.getCopyNotes(endColumn.notes);

      const [removed] = this.getDelNote(startingNotes, source.index);
      const insertNotes = this.getWithInsertedNotes(endNotes, destination.index, removed);

      store.dispatch(insertNote(startingColumn.id, startingNotes, endColumn.id, insertNotes));
    } else {
      const startingColumn = this.getNotesInColumn(source.droppableId);

      const startingNotes = this.getCopyNotes(startingColumn.notes);

      const [removed] = this.getDelNote(startingNotes, source.index);
      const insertNotes = this.getWithInsertedNotes(startingNotes, destination.index, removed);

      store.dispatch(insertNote(startingColumn.id, insertNotes));
    }
  };

  private getNotesInColumn = (columnId: string): Column => {
    const columns = store.getState().column.present.columns;
    const columnIndex = columns.findIndex((column) => column.id === Number(columnId));

    return columns[columnIndex];
  };

  private getCopyNotes = (notes: Note[]): Note[] => {
    return [...notes];
  };

  private getDelNote = (notes: Note[], index: number): Note[] => {
    return notes.splice(index, 1);
  };

  private getWithInsertedNotes = (notes: Note[], index: number, removed: Note): Note[] => {
    notes.splice(index, 0, removed);

    return notes;
  };
}

export default new NoteDragService();
