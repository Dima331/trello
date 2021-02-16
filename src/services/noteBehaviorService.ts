import store from '../store';
import { editOpenModal } from '../store/modules/modal/actions';
import { Note } from '../types/Notes';
import {
  horizontalMovingNote,
  activeNote,
  verticalMovingNote,
} from '../store/modules/notes/actions';
import { MovementDirection, MovementDirectionConfig } from '../constants/movement';
import { Keys } from '../config/keys';

class NoteBehaviorService {
  public handleKeyPress = (key: string, note: Note) => {
    switch (key) {
      case Keys.Enter:
        store.dispatch(activeNote(note.id));
        store.dispatch(editOpenModal(note));
        break;
      case Keys.ArrowLeft:
        this.horizontalMovingHandle(note, MovementDirection.Left);
        break;
      case Keys.ArrowRight:
        this.horizontalMovingHandle(note, MovementDirection.Right);
        break;
      case Keys.ArrowUp:
        this.verticalMovingHandle(note, MovementDirection.Up);
        break;
      case Keys.ArrowDown:
        this.verticalMovingHandle(note, MovementDirection.Down);
        break;
      default: console.error();
    }
  };

  private horizontalMovingHandle = (note: Note, movementDirection: MovementDirection) => {
    const columns = store.getState().group.present.column.columns;

    const directionConfig = MovementDirectionConfig[movementDirection];

    const activeColumn = columns.find((column) => column.id === note.columnId)!;

    const isMovementAvailable = directionConfig.isMovementAvailable!(activeColumn.id, columns);

    if (!isMovementAvailable) {
      return;
    }

    const newColumnId = directionConfig.getNewColumnId!(activeColumn.id, columns);
    store.dispatch(horizontalMovingNote(note, newColumnId as number));
  };

  private verticalMovingHandle = (note: Note, movementDirection: MovementDirection) => {
    const notes = store.getState().group.present.notes.data;

    const directionConfig = MovementDirectionConfig[movementDirection];

    const activeNotesInColumn = notes.filter((noteItem) => noteItem.columnId === note.columnId)!;

    const isMovementAvailable = directionConfig.isMovement!(activeNotesInColumn, note);

    if (!isMovementAvailable) {
      return;
    }

    const newNoteId = directionConfig.getNewNote!(activeNotesInColumn, note);
    store.dispatch(verticalMovingNote(note, newNoteId as Note));
  };
}

export default new NoteBehaviorService();
