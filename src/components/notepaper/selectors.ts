import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Column } from '../../types/Columns';
import { Note } from '../../types/Notes';

interface ColumnSelectorProps {
  columns: Column[];
  notes: Note[];
}

const columnsSelector: Selector<StoreState, Column[]> =
  (state) => state?.group?.present?.column.columns || [];
const notesSelector: Selector<StoreState, Note[]> =
  (state) => state?.group?.present?.notes?.data || [];

const NotepaperSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  columns: columnsSelector,
  notes: notesSelector,
});

export default NotepaperSelector;
