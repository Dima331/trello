import { setLocalStorage, getLocalStorage } from '../../../helpers/localStorageHelper';

import {
  NotesActions,
  Note,
  NotesTypes,
} from './types';

export interface NotesType {
  data: Note[];
}

const initialState: NotesType = {
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
};

export default function notesReducer(
  state = initialState,
  action: NotesActions,
): NotesType {
  switch (action.type) {
    case NotesTypes.CREATE_NOTE:

      state.data.forEach((note) => {
        note.active = false;

        return note;
      });

      setLocalStorage('notes', [...state.data, action.payload.note]);

      return {
        data: [...state.data, action.payload.note],
      };
    case NotesTypes.UPDATE_NOTE: {
      const data = state.data.map((note) => {
        note.active = false;

        if (note.id === action.payload.note.id) {
          return {
            ...action.payload.note,
            columnId: note.columnId,
          };
        }

        return note;
      });

      setLocalStorage('notes', data);

      return { data };
    }
    case NotesTypes.DELETE_NOTE: {
      const data = state.data.filter(
        (note) => note.id !== action.payload.note.id,
      );

      setLocalStorage('notes', data);

      return { data };
    }
    case NotesTypes.DELETE_NOTES_IN_COLUMN: {
      const data = state.data.filter(
        (note) => note.columnId !== action.payload.columnId,
      );

      setLocalStorage('notes', data);

      return { data };
    }
    case NotesTypes.GET_NOTES: {
      const notes: Note[] | null = getLocalStorage('notes');

      if (notes && notes.length !== 0) {
        const data = notes.map((note) => {
          note.active = false;

          return note;
        });

        return {
          data,
        };
      }

      return { data: [] };
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

      return { data };
    }

    case NotesTypes.SHIFT_LEFT_RIGHT_NOTE: {
      action.payload.note.columnId = action.payload.columnId;
      action.payload.note.active = true;

      const data = state.data.filter((note) => {
        if (note.id === action.payload.note.id) {
          return false;
        }

        return true;
      });

      setLocalStorage('notes', [...data, action.payload.note]);

      return { data: [...data, action.payload.note] };
    }

    case NotesTypes.SHIFT_UP_DOWN_NOTE: {
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

      return { data };
    }

    default:
      return state;
  }
}
