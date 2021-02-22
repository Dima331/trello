import { ActionCreators as UndoActionCreators } from 'redux-undo';
import store from '../store';

import { KeysCode } from '../config/keys';

interface KeyPressProps {
  ctrlKey: boolean;
  keyCode: number;
}

class HistoryService {
  public keyPressHandle = ({
    ctrlKey,
    keyCode,
  }: KeyPressProps): void => {
    if (ctrlKey) {
      switch (keyCode) {
        case KeysCode.codeZ:
          this.stepPrevHandle();
          break;
        case KeysCode.codeY:
          this.stepNextHandle();
          break;
        default: console.error();
      }
    }
  };

  private stepPrevHandle = (): void => {
    const steps = store.getState().column.past.length;

    if (steps) {
      store.dispatch(UndoActionCreators.undo());
    }
  };

  private stepNextHandle = (): void => {
    const steps = store.getState().column.future.length;

    if (steps) {
      store.dispatch(UndoActionCreators.redo());
    }
  };
}

export default new HistoryService();
