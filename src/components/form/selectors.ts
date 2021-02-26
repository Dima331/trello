import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Note } from '../../types/Notes';
import { Column } from '../../types/Columns';

type FormSelectorProps = {
  note: Note | undefined;
  columnId: number | undefined;
  columns: Column[];
  isLoading: boolean;
  image: string;
  error: string;
};

const columnIdSelector: Selector<StoreState, number | undefined> =
  (state) => state?.modal?.columnId;
const noteSelector: Selector<StoreState, Note | undefined> =
  (state) => state?.modal?.note;
const columnsSelector: Selector<StoreState, Column[]> =
  (state) => state?.column?.present?.columns || [];
const imageSelector: Selector<StoreState, string> =
  (state) => state?.image.image;
const isLoadingSelector: Selector<StoreState, boolean> =
  (state) => state?.image.isLoading;
const isErrorlector: Selector<StoreState, string> =
  (state) => state?.image.error || '';

const FormSelector = createStructuredSelector<StoreState, FormSelectorProps>({
  note: noteSelector,
  columnId: columnIdSelector,
  columns: columnsSelector,
  image: imageSelector,
  isLoading: isLoadingSelector,
  error: isErrorlector,
});

export default FormSelector;
