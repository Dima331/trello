import {
  NotesState,
  NotesActionsTypes,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  DELETE_NOTES_IN_COLUMN,
} from './types';

const initialState: NotesState = {
  data: [
    {
      id: 1,
      title: '111',
      description: '111',
      columnId: 1
    }
  ],
};

export default function notesReducer(
  state = initialState,
  action: NotesActionsTypes
): NotesState {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        data: [...state.data, action.payload.note],
      };
    case UPDATE_NOTE: {
      const data = state.data.map(note => {
        if (note.id === action.payload.note.id) {

          return {
            ...action.payload.note,
            columnId: note.columnId
          }
        }

        return note
      });

      return { data };
    }
    case DELETE_NOTE: {
      const data = state.data.filter(
        note => note.id !== action.payload.note.id
      );

      return { data };
    }
    case DELETE_NOTES_IN_COLUMN: {
      const data = state.data.filter(
        note => note.columnId !== action.payload.columnId
      );

      return { data };
    }
    default:
      return state;
  }
}
