import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import Dropzone from 'react-dropzone';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
import markersConfig from '../../config/markers';
import {
  fetchImageRequest,
  removeImage,
  addEditImage,
} from '../../store/modules/image/actions';
import { isDateExpired } from '../../helpers/dateHelpers';

import FormSelector from './selectors';
import useStyles from './styles';

const Form: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [colors] = useState<string[]>(colorsConfig);
  const [markers] = useState<string[]>(markersConfig);

  const [activeColor, setActiveColor] = useState<string>(colors[0]);
  const [activeMarker, setActiveMarker] = useState<string>(markers[0]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const {
    note,
    columnId,
    columns,
    image,
    isLoading,
    error,
  } = useSelector(FormSelector);

  useEffect((): void => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setActiveColor(note.color);
      setActiveMarker(note.marker);
      setSelectedDate(new Date(note.date as Date));
      if (note.image) {
        dispatch(addEditImage(note.image));
      }
    }
  }, [note]);

  const dropImageHandler = useCallback((acceptedFile: File[]): void => {
    dispatch(fetchImageRequest(acceptedFile[0]));
  }, []);

  const addNote = useCallback((): void => {
    const lastId = getLastIdNotes(columns);
    const time = isDateExpired(selectedDate as Date);

    dispatch(closeModal());
    dispatch(removeImage());
    dispatch(addToColumn(columnId!,
      {
        id: lastId,
        title,
        description,
        color: activeColor,
        marker: activeMarker,
        date: selectedDate,
        image,
        time,
      }));
  }, [
    title,
    description,
    columnId,
    activeColor,
    activeMarker,
    selectedDate,
    image,
  ]);

  const editNote = useCallback((): void => {
    if (note && columnId) {
      const time = isDateExpired(selectedDate as Date);

      dispatch(closeModal());
      dispatch(removeImage());
      dispatch(
        updateNote(columnId,
          {
            id: note.id,
            title,
            description,
            color: activeColor,
            marker: activeMarker,
            active: true,
            date: selectedDate,
            image,
            time,
          }),
      );
    }
  }, [
    note,
    title,
    description,
    columnId,
    activeColor,
    activeMarker,
    selectedDate,
    image,
  ]);

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

  const renderMarkers = useCallback((): JSX.Element[] => {
    return markers.map((marker) => (
      <option
        key={marker}
        value={marker}
      >
        {marker}
      </option>
    ));
  }, [markers]);

  const renderControls = (): JSX.Element => {
    if (note) {
      return (
        <Button
          onClick={editNote}
          disabled={isLoading}
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
        disabled={isLoading}
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
              value={activeColor}
              onChange={(e): void => setActiveColor(e.target.value)}
            >
              {renderColors()}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="uncontrolled-native">Markers</InputLabel>
            <NativeSelect
              value={activeMarker}
              onChange={(e): void => setActiveMarker(e.target.value)}
            >
              {renderMarkers()}
            </NativeSelect>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              value={selectedDate}
              onChange={setSelectedDate}
              label="Date and time"
              format="yyyy/MM/dd hh:mm a"
            />
          </MuiPickersUtilsProvider>
          <Dropzone onDrop={dropImageHandler}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={classes.dropzone}>
                <input {...getInputProps()} />
                <p>Drag anD drop files, or click to select files</p>
              </div>
            )}
          </Dropzone>
          {image && <img src={image} alt="img" className={classes.image} />}
          {error && <p>{error}</p>}
          {renderControls()}
        </form>
      </div>
    </Container>
  );
};

export default Form;
