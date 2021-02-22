import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../types/Notes';
import { Column } from '../../types/Columns';

type FormSelectorProps = {
  note: Note | undefined;
  columnId: number | undefined;
  columns: Column[];
};

const columnIdSelector: Selector<StoreState, number | undefined> =
  (state) => state?.modal?.columnId;
const noteSelector: Selector<StoreState, Note | undefined> =
  (state) => state?.modal?.note;
const columnsSelector: Selector<StoreState, Column[]> =
  (state) => state?.column?.present?.columns || [];

const FormSelector = createStructuredSelector<StoreState, FormSelectorProps>({
  note: noteSelector,
  columnId: columnIdSelector,
  columns: columnsSelector,
});

export default FormSelector;
