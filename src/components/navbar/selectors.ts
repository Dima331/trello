import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';

interface StepsSelectorProps {
  pastLength: number;
  futureLength: number;
}

const pastSelector: Selector<StoreState, number> = (state) => state?.group?.past.length || 0;
const futureSelector: Selector<StoreState, number> = (state) => state?.group?.future.length || 0;

const StepsSelector = createStructuredSelector<StoreState, StepsSelectorProps>({
  pastLength: pastSelector,
  futureLength: futureSelector,
});

export default StepsSelector;
