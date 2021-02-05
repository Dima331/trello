import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Column } from '../../store/modules/columns/types';

interface ColumnSelectorProps {
  columns: Column[];
}

const columnsSelector: Selector<StoreState, Column[]> = (state) => state?.column?.columns || [];

const ColumnSelector = createStructuredSelector<StoreState, ColumnSelectorProps>({
  columns: columnsSelector,
});

export default ColumnSelector;
