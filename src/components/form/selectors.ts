import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../store/modules/modal/types';

type FormSelectorProps = {
  notes: Note[] | [];
  note: Note | undefined;
  columnId: number;
}

const notesSelector: Selector<StoreState, Note[] | []> = (state) => state?.notes?.data;
const noteSelector: Selector<StoreState, Note | undefined> = (state) => state?.modal?.note;
const columnIdSelector: Selector<StoreState, number> = (state) => state?.modal?.columnId || 0;

const FormSelector = createStructuredSelector<StoreState, FormSelectorProps>({
  notes: notesSelector,
  note: noteSelector,
  columnId: columnIdSelector,
});

export default FormSelector;
