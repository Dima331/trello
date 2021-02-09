import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Column } from '../../store/modules/columns/types';
import { Note } from '../../store/modules/modal/types';

interface ColumnSelectorProps {
  columns: Column[];
  notes: Note[];
}

const columnsSelector: Selector<StoreState, Column[]> = (state) => state?.column?.columns || [];
const notesSelector: Selector<StoreState, Note[]> = (state) => state?.notes?.data || [];

const NotepaperSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  columns: columnsSelector,
  notes: notesSelector,
});

export default NotepaperSelector;
