import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../types/Notes';

type FormSelectorProps = {
  note: Note | undefined;
  columnId: number;
};

const noteSelector: Selector<StoreState, Note | undefined> = (state) => state?.modal?.note;
const columnIdSelector: Selector<StoreState, number> = (state) => state?.modal?.columnId || 0;

const FormSelector = createStructuredSelector<StoreState, FormSelectorProps>({
  note: noteSelector,
  columnId: columnIdSelector,
});

export default FormSelector;
