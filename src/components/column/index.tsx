import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import { deleteNoteInColumn } from '../../store/modules/notes/actions';
import { addNoteModal } from '../../store/modules/modal/actions';
import { deleteColumn } from '../../store/modules/columns/actions';
import Notepaper from '../notepaper';

import ColumnSelector from './selectors';
import useStyles from './styles';

interface ColumnProps {
  columnId: number;
}

const Column: React.FC<ColumnProps> = ({
  columnId,
}: ColumnProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { notes } = useSelector(ColumnSelector);

  const deleteColumnHandler = useCallback(() => {
    dispatch(deleteNoteInColumn(columnId));
    dispatch(deleteColumn({ id: columnId }));
  }, [dispatch, columnId]);

  const renderNotes = useCallback(() => {
    if (notes) {
      return notes
        .filter((note) => note.columnId === columnId)
        .map((note) => (
          <Notepaper
            key={note.id}
            note={note}
          />
        ));
    }

    return null;
  }, [notes, columnId]);

  const openHandler = (): void => {
    dispatch(addNoteModal(columnId));
  };

  return (
    <div className={classes.columnContainer}>
      <div className={classes.notesList}>
        {renderNotes()}
        <Button
          size="small"
          color="primary"
          onClick={() => openHandler()}
        >
          Add note
        </Button>
      </div>
      <Button
        size="small"
        color="primary"
        onClick={deleteColumnHandler}
      >
        delete column
      </Button>
    </div>
  );
};

export default Column;
