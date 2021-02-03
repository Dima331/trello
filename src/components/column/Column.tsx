import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Note } from "../note/Note";
import { ModalWindow } from "../modal/Modal";
import { RootState } from '../../store/modules/combineReducers';
import { deleteNoteInColumn } from '../../store/modules/notes/actions';
import { deleteColumn } from '../../store/modules/columns/actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  openModal,
} from '../../store/modules/modal/actions';

const useStyles = makeStyles({
  div: {
    width: '200px',
    marginRight: '20px'
  },
  ul: {
    backgroundColor: '#cbfeff',
    height: '70vh'
  },
});

interface ColumnProps {
  columnId: number
}

export const Column: React.FC<ColumnProps> = (props) => {
  const notes = useSelector((state: RootState) => state.notes.data);
  const dispatch = useDispatch();
  const classes = useStyles();
  const deleteColumnHandler = () => {
    dispatch(deleteNoteInColumn(props.columnId));
    dispatch(deleteColumn({ id: props.columnId }));
  }

  const handleOpen = (note: number): void => {
    console.log(note)
    dispatch(openModal())
  };

  return (
    <div className={classes.div}>
      <div className={classes.ul}>
        {notes && notes.map((note, index) => {
          if (note.columnId === props.columnId) {
            return (
              <div key={note.id}>
                <div>
                  <Note
                    note={note}
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
      <Button
        size="small"
        color="primary"
        onClick={() => deleteColumnHandler()}
      >
        delete column
        </Button>
    </div>
  );
}

