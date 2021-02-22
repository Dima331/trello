import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';
import { Column } from '../../types/Columns';

interface DashboardSelectorProps {
  columns: Column[];
  background: number | undefined;
}

const columnsSelector: Selector<StoreState, Column[]> =
  (state) => state?.column?.present?.columns || [];
const backgroundSelector: Selector<StoreState, number | undefined> =
  (state) => state?.background?.background;

const DashboardSelector = createStructuredSelector<StoreState, DashboardSelectorProps>({
  columns: columnsSelector,
  background: backgroundSelector,
});

export default DashboardSelector;
