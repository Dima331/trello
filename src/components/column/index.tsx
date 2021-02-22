import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';

import { addNoteModal } from '../../store/modules/modal/actions';
import { deleteColumn } from '../../store/modules/columns/actions';
import { Note } from '../../types/Notes';
import Notepaper from '../notepaper';

import useStyles from './styles';

interface ColumnProps {
  columnId: number;
  notesInColumn: Note[];
}

const Column: React.FC<ColumnProps> = ({
  columnId,
  notesInColumn,
}: ColumnProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteColumnHandler = useCallback((): void => {
    dispatch(deleteColumn(columnId));
  }, [columnId]);

  const renderNotes = useCallback((): JSX.Element[] => {
    return notesInColumn.map((note, index) => (
      <Notepaper
        key={note.id}
        note={note}
        columnId={columnId}
        index={index}
      />
    ));
  }, [columnId, notesInColumn]);

  const openHandler = useCallback((): void => {
    dispatch(addNoteModal(columnId));
  }, [columnId]);

  return (
    <Droppable droppableId={String(columnId)} key={columnId}>
      {(provided) => {
        return (
          <div
            className={classes.columnContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className={classes.notesList}>
              {renderNotes()}
              <Button
                size="small"
                color="primary"
                onClick={openHandler}
              >
                Add note
              </Button>
            </div>
            <Button
              size="small"
              color="primary"
              onClick={deleteColumnHandler}
            >
              Delete column
            </Button>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
