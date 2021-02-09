import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  deleteNote,
  activeNote,
  shiftLeftRightNote,
  shiftUpDownNote,
} from '../../store/modules/notes/actions';
import { editOpenModal } from '../../store/modules/modal/actions';
import { Note } from '../../store/modules/notes/types';
import { trimText } from '../../helpers/stringHelper';

import NotepaperSelector from './selectors';
import useStyles from './styles';

interface NoteProps {
  note: Note;
}

const Notepaper: React.FC<NoteProps> = ({ note }: NoteProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputEl = useRef<HTMLHeadingElement>(null);

  const { columns, notes } = useSelector(NotepaperSelector);

  useEffect(() => {
    if (note && note.active) {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    }
  });

  function deleteNoteHandler(): void {
    dispatch(deleteNote(note));
  }

  const editNoteHandler = (event: React.MouseEvent<HTMLButtonElement>, id: number): void => {
    event.preventDefault();
    dispatch(activeNote(id));
    dispatch(editOpenModal(note));
  };

  const focuseNote = (id: number): void => {
    dispatch(activeNote(id));
  };

  const enterNote = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();

    if (event.key === 'Enter') {
      dispatch(editOpenModal(note));
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      let columnId: number | null = null;

      columns.forEach((column, index) => {
        if (column.id === note.columnId) {
          if (event.key === 'ArrowLeft') {
            if (!columns[index - 1]) {
              return;
            }

            columnId = columns[index - 1].id;
          }

          if (event.key === 'ArrowRight') {
            if (!columns[index + 1]) {
              return;
            }

            columnId = columns[index + 1].id;
          }
        }
      });

      if (columnId) {
        dispatch(shiftLeftRightNote(note, columnId));
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const columnOneId = notes.filter((noteItem) => {
        if (noteItem.columnId === note.columnId) {
          return true;
        }
        return false;
      });

      if (event.key === 'ArrowUp') {
        if (columnOneId[0].id === note.id) {
          return;
        }
      }

      if (event.key === 'ArrowDown') {
        if (columnOneId[columnOneId.length - 1].id === note.id) {
          return;
        }
      }

      let changeIndex: number = 0;

      columnOneId.forEach((noteItem, index) => {
        if (noteItem.id === note.id) {
          changeIndex = index;
        }
      });

      if (event.key === 'ArrowUp') {
        dispatch(shiftUpDownNote(note, columnOneId[changeIndex - 1]));
      }

      if (event.key === 'ArrowDown') {
        dispatch(shiftUpDownNote(note, columnOneId[changeIndex + 1]));
      }
    }
  };

  return (
    <Card
      className={classes.card}
      style={{ backgroundColor: note.color }}
    >
      <div
        className={note.active ? classes.focus : undefined}
        onClick={() => focuseNote(note.id)}
        onKeyDown={(event) => enterNote(event)}
        ref={inputEl}
        tabIndex={0}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {trimText(note.description)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={(event) => editNoteHandler(event, note.id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => deleteNoteHandler()}
          >
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default Notepaper;
