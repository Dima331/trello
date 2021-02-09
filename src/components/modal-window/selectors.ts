import { Selector, createStructuredSelector } from 'reselect';
import { StoreState } from '../../store/modules/combineReducers';

interface ModalSelectorProps {
  isModalOpen: boolean;
}

const modalSelector: Selector<StoreState, boolean> = (state) => state?.modal?.isModalOpen || false;

const ModalWindowSelector = createStructuredSelector<StoreState, ModalSelectorProps>({
  isModalOpen: modalSelector,
});

export default ModalWindowSelector;
