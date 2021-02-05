import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../store/modules/modal/types';

interface ColumnSelectorProps {
  notes: Note[];
}

const notesSelector: Selector<StoreState, Note[]> = (state) => state?.notes?.data || [];

const ColumnSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  notes: notesSelector,
});

export default ColumnSelector;
