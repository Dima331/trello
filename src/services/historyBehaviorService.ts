import { ActionCreators as UndoActionCreators } from 'redux-undo';
import store from '../store';

import { Keys } from '../config/keys';

class HistoryBehaviorService {
  public handleKeyPress = (ctrlKey: boolean, key: number) => {
    if (ctrlKey) {
      switch (key) {
        case Keys.codeZ:
          this.stepPrevHandle();
          break;
        case Keys.codeY:
          this.stepNextHandle();
          break;
        default: console.error();
      }
    }
  };

  private stepPrevHandle = () => {
    const steps = store.getState().group.past.length;

    if (steps) {
      store.dispatch(UndoActionCreators.undo());
    }
  };

  private stepNextHandle = () => {
    const steps = store.getState().group.future.length;

    if (steps) {
      store.dispatch(UndoActionCreators.redo());
    }
  };
}

export default new HistoryBehaviorService();
