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
    },
  ],
};

export default function notesReducer(
  state = initialState,
  action: NotesActions,
): NotesType {
  switch (action.type) {
    case NotesTypes.CREATE_NOTE:
      return {
        data: [...state.data, action.payload.note],
      };
    case NotesTypes.UPDATE_NOTE: {
      const data = state.data.map((note) => {
        console.log(note);
        if (note.id === action.payload.note.id) {
          return {
            ...action.payload.note,
            columnId: note.columnId,
          };
        }

        return note;
      });

      return { data };
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
    default:
      return state;
  }
}
