import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Column } from '../../types/Columns';

interface ColumnSelectorProps {
  columns: Column[];
  cover: number;
}

const columnsSelector: Selector<StoreState,
Column[]> = (state) => state?.group?.present?.column.columns
    || [];
const coverSelector: Selector<StoreState, number> = (state) => state?.cover?.cover || 1;

const ColumnSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  columns: columnsSelector,
  cover: coverSelector,
});

export default ColumnSelector;
