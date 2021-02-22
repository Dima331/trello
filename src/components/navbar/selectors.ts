import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';

interface NavbarSelectorProps {
  pastLength: number;
  futureLength: number;
}

const pastLengthSelector: Selector<StoreState, number> =
  (state) => state?.column?.past.length || 0;
const futureLengthSelector: Selector<StoreState, number> =
  (state) => state?.column?.future.length || 0;

const NavbarSelector = createStructuredSelector<StoreState, NavbarSelectorProps>({
  pastLength: pastLengthSelector,
  futureLength: futureLengthSelector,
});

export default NavbarSelector;
