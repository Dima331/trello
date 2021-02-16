import { getLastIdNotes } from '../../../helpers/actionIdHelper';
import { Note } from '../../../types/Notes';

import {
  NotesActions,
  NotesTypes,
} from './types';

export interface NotesState {
  data: Note[];
  isLoadingNotes?: boolean,
}

const initialState: NotesState = {
  data: [
    {
      id: 1,
      title: '111',
      description: '111',
      columnId: 1,
      color: 'green',
      active: false,
    },
  ],
  isLoadingNotes: true,
};

export default function notesReducer(
  state = initialState,
  action: NotesActions,
): NotesState {
  switch (action.type) {
    case NotesTypes.CREATE_NOTE: {
      const lastId = getLastIdNotes(state.data);

      action.payload.note.id = lastId;

      state.data.forEach((note) => {
        note.active = false;

        return note;
      });

      return {
        data: [...state.data, action.payload.note],
      };
    }
    case NotesTypes.UPDATE_NOTE: {
      const data = state.data.map((note) => {
        note.active = false;

        if (note.id === action.payload.note.id) {
          action.payload.note.active = true;

          return {
            ...action.payload.note,
            columnId: note.columnId,
          };
        }

        return note;
      });

      return {
        data,
        isLoadingNotes: false,
      };
    }
    case NotesTypes.DELETE_NOTE: {
      const data = state.data.filter(
        (note) => note.id !== action.payload.note.id,
      );

      return { data };
    }
    case NotesTypes.DELETE_NOTES_IN_COLUMN: {
      const data = state.data.filter(
        (note) => note.columnId !== action.payload.columnId,
      );

      return { data };
    }
    case NotesTypes.ACTIVE_NOTE: {
      const data = state.data.map((note) => {
        if (note.id === action.payload.noteId) {
          note.active = true;

          return note;
        }
        note.active = false;

        return note;
      });

      return {
        data,
        isLoadingNotes: false,
      };
    }

    case NotesTypes.HORIZONTAL_MOVING_NOTE: {
      const activeNote = JSON.parse(JSON.stringify(action.payload.note));
      // activeNote.active = true;
      activeNote.columnId = action.payload.columnId;

      const data = state.data.filter((note) => {
        if (note.id === action.payload.note.id) {
          return false;
        }

        return true;
      });

      data.push(activeNote);

      return {
        data,
        isLoadingNotes: false,
      };
    }

    case NotesTypes.VERTICAL_MOVING_NOTE: {
      let firstNote: number | null = null;
      let secondNote: number | null = null;

      const data = state.data.map((note, index) => {
        if (note.id === action.payload.note.id) {
          firstNote = index;
        }
        if (note.id === action.payload.noteExchange.id) {
          secondNote = index;
        }
        return note;
      });

      if (firstNote !== null && secondNote !== null) {
        data[firstNote] = data.splice(secondNote, 1, data[firstNote])[0];
      }

      return {
        data,
        isLoadingNotes: false,
      };
    }
    case NotesTypes.REMOVE_ACTIVE_NOTE: {
      const data = state.data.map((note) => {
        note.active = false;
        return note;
      });

      return {
        data,
        isLoadingNotes: false,
      };
    }
    default:
      return state;
  }
}
