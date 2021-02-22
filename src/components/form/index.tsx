import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import {
  addToColumn,
  updateNote,
} from '../../store/modules/columns/actions';
import { closeModal } from '../../store/modules/modal/actions';
import { getLastIdNotes } from '../../helpers/actionIdHelper';
import colorsConfig from '../../config/colors';

import FormSelector from './selectors';
import useStyles from './styles';

const Form: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [colors] = useState<string[]>(colorsConfig);
  const [activColor, setActivColor] = useState<string>(colors[0]);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const {
    note,
    columnId,
    columns,
  } = useSelector(FormSelector);

  useEffect((): void => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setActivColor(note.color);
    }
  }, [note]);

  const addNote = useCallback((): void => {
    const lastId = getLastIdNotes(columns);

    dispatch(closeModal());
    dispatch(addToColumn(columnId!,
      {
        id: lastId,
        title,
        description,
        color: activColor,
      }));
  }, [title, description, columnId, activColor]);

  const editNote = useCallback((): void => {
    if (note && columnId) {
      dispatch(closeModal());
      dispatch(
        updateNote(columnId,
          {
            id: note.id,
            title,
            description,
            color: activColor,
            active: true,
          }),
      );
    }
  }, [note, title, description, columnId, activColor]);

  const renderColors = useCallback((): JSX.Element[] => {
    return colors.map((color) => (
      <option
        key={color}
        value={color}
      >
        {color}
      </option>
    ));
  }, [colors]);

  const renderControls = (): JSX.Element => {
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
          {renderControls()}
        </form>
      </div>
    </Container>
  );
};

export default Form;
