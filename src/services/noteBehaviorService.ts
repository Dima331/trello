import store from '../store';
import { editOpenModal } from '../store/modules/modal/actions';
import { Note } from '../types/Notes';

import {
  horizontalMovingNote,
  verticalMovingNote,
} from '../store/modules/columns/actions';
import {
  MovementDirection,
  MovementDirectionConfig,
  VerticalDirections,
  HorizontalDirections,
} from '../constants/movement';
import { KeysCode } from '../config/keys';

class NoteBehaviorService {
  public handleKeyPress = (key: number, note: Note, columnId: number): void => {
    switch (key) {
      case KeysCode.Enter:
        store.dispatch(editOpenModal(columnId, note));
        break;
      case KeysCode.ArrowLeft:
        this.horizontalMovingHandle(columnId, note, MovementDirection.Left);
        break;
      case KeysCode.ArrowRight:
        this.horizontalMovingHandle(columnId, note, MovementDirection.Right);
        break;
      case KeysCode.ArrowUp:
        this.verticalMovingHandle(columnId, note, MovementDirection.Up);
        break;
      case KeysCode.ArrowDown:
        this.verticalMovingHandle(columnId, note, MovementDirection.Down);
        break;
      default: console.error();
    }
  };

  private horizontalMovingHandle = (
    activeColumnId: number,
    note: Note,
    movementDirection: MovementDirection,
  ): void => {
    const columns = store.getState().column.present.columns;
    const directionConfig = MovementDirectionConfig[movementDirection] as HorizontalDirections;
    const isMovementAvailable = directionConfig.isMovementAvailable!(activeColumnId, columns);

    if (!isMovementAvailable) {
      return;
    }

    const newColumnId = directionConfig.getNewColumnId!(activeColumnId, columns);

    store.dispatch(horizontalMovingNote(note, activeColumnId, newColumnId));
  };

  private verticalMovingHandle = (
    activeColumnId: number,
    note: Note,
    movementDirection: MovementDirection,
  ): void => {
    const notesInColumn = store.getState().column.present.columns[activeColumnId - 1].notes;
    const directionConfig = MovementDirectionConfig[movementDirection] as VerticalDirections;
    const isMovementAvailable = directionConfig.isMovementAvailable!(notesInColumn, note);

    if (!isMovementAvailable) {
      return;
    }

    const indexNote = this.getIndexNote(notesInColumn, note);
    const newNotes = directionConfig.getNotes!(notesInColumn, indexNote);

    store.dispatch(verticalMovingNote(activeColumnId, newNotes));
  };

  private getIndexNote = (notes: Note[], note: Note): number => {
    return notes.findIndex((noteItem) => noteItem.id === note.id);
  };
}

export default new NoteBehaviorService();
