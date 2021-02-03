import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules/combineReducers';
import {
  createNote,
  updateNote
} from '../../store/modules/notes/actions';
import { closeModal } from '../../store/modules/modal/actions';
import { Notes } from '../../store/modules/notes/types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Form: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.data);
  const note = useSelector((state: RootState) => state.modal.note);
  const columnId = useSelector((state: RootState) => state.modal.columnId);
  const [description, setDescription] = useState('test');
  const [title, setTitle] = useState('test');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [note, columnId])

  function lastId(): number {
    return notes[notes.length - 1] ? notes[notes.length - 1].id + 1 : 1;
  }

  function addNote(): void {
    if(columnId){
    dispatch(closeModal())
    dispatch(
      createNote({
        id: lastId(),
        title,
        description,
        columnId: columnId.columnId
      })
    );
    }
  }

  function editNote(note: Notes): void {
    dispatch(closeModal())
    dispatch(
      updateNote({
        id: note.id,
        title,
        description,
      })
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e): void => setTitle(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="text"
            label="Email Address"
            name="text"
            autoComplete="text"
            autoFocus
          />
          <TextField
            variant="outlined"
            value={description}
            onChange={(e): void => setDescription(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="text2"
            label="Password"
            type="text2"
            id="text2"
            autoComplete="current-password"
          />
          {note ?
            <Button
              onClick={() => editNote(note)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit
            </Button>
            : <Button
              onClick={() => addNote()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}