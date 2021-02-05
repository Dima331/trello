import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import {
  createNote,
  updateNote,
} from '../../store/modules/notes/actions';
import { closeModal } from '../../store/modules/modal/actions';

import FormSelector from './selectors';
import useStyles from './styles';

const Form: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [colors] = useState<string[]>(['red', 'green', 'blue']);
  const [activColor, setActivColor] = useState<string>(colors[0]);
  const [description, setDescription] = useState<string>('test');
  const [title, setTitle] = useState<string>('test');

  const { notes } = useSelector(FormSelector);
  const { note } = useSelector(FormSelector);
  const { columnId } = useSelector(FormSelector);

  useEffect(() => {
    if (note && note.id !== 0) {
      setTitle(note.title);
      setDescription(note.description);
      setActivColor(note.color);
    }
  }, [note]);

  const getLastId = useCallback((): number => {
    return notes[notes.length - 1] ? notes[notes.length - 1].id + 1 : 1;
  }, [notes]);

  const addNote = useCallback((): void => {
    if (columnId) {
      dispatch(closeModal());
      dispatch(
        createNote({
          id: getLastId(),
          title,
          description,
          columnId,
          color: activColor,
        }),
      );
    }
  }, [title, description, columnId, activColor]);

  const editNote = useCallback((): void => {
    if (note) {
      dispatch(closeModal());
      dispatch(
        updateNote({
          id: note.id,
          title,
          description,
          color: activColor,
        }),
      );
    }
  }, [title, description, columnId, activColor]);

  const renderColors = useCallback(() => (
    colors.map((color) => (
      <option
        key={color}
        value={color}
      >
        {color}
      </option>
    ))
  ), [colors]);

  const renderButton = () => {
    if (note) {
      return (
        <Button
          onClick={editNote}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Edit
        </Button>
      );
    }
    return (
      <Button
        onClick={addNote}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Add
      </Button>
    );
  };

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
            label="title"
            name="text"
            autoComplete="text"
            autoFocus
          />
          <TextField
            variant="outlined"
            value={description}
            onChange={(e): void => setDescription(e.target.value)}
            margin="normal"
            rows={4}
            multiline
            required
            fullWidth
            label="description"
            type="text"
            autoComplete="current-password"
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="uncontrolled-native">Color</InputLabel>
            <NativeSelect
              value={activColor}
              onChange={(e): void => setActivColor(e.target.value)}
            >
              {renderColors()}
            </NativeSelect>
          </FormControl>
          {renderButton()}
        </form>
      </div>
    </Container>
  );
};

export default Form;
