import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../types/Notes';

interface ColumnSelectorProps {
  notes: Note[];
}

const notesSelector: Selector<StoreState, Note[]> = (state) => state?.group?.present?.notes?.data
  || [];

const ColumnSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  notes: notesSelector,
});

export default ColumnSelector;
