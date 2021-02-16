import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  deleteNote,
  activeNote,
  removeActiveNote,
} from '../../store/modules/notes/actions';
import { editOpenModal } from '../../store/modules/modal/actions';
import { Note } from '../../types/Notes';
import { trimText } from '../../helpers/stringHelper';
import noteBehaviorService from '../../services/noteBehaviorService';

import useStyles from './styles';

interface NoteProps {
  note: Note;
}

const Notepaper: React.FC<NoteProps> = ({ note }: NoteProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputNote = useRef<HTMLHeadingElement>(null);

  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (note && note.active) {
      if (inputNote.current) {
        inputNote.current.focus();
      }
    }
  });

  const deleteNoteHandler = useCallback((): void => {
    dispatch(deleteNote(note));
  }, [note]);

  const editNoteHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(activeNote(note.id));
    dispatch(editOpenModal(note));
  }, [note]);

  const focuseNote = useCallback((): void => {
    dispatch(activeNote(note.id));
  }, [note]);

  const blurHandler = useCallback((): void => {
    dispatch(removeActiveNote());
  }, []);

  const enterNoteHandler = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();

    noteBehaviorService.handleKeyPress(event.key, note);
    setHover(false);
  };

  const toggleHoverHandler = useCallback((): void => {
    setHover((prev) => !prev);
  }, []);

  const renderButton = () => {
    if (hover) {
      return (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={editNoteHandler}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={deleteNoteHandler}
          >
            Delete
          </Button>
        </CardActions>
      );
    }
  };

  return (
    <Card
      className={classes.card}
      style={{ backgroundColor: note.color }}
      onMouseEnter={toggleHoverHandler}
      onMouseLeave={toggleHoverHandler}
    >
      <div
        className={note.active ? classes.focus : classes.notFocus}
        onClick={focuseNote}
        onKeyDown={(event) => enterNoteHandler(event)}
        ref={inputNote}
        tabIndex={0}
        onBlur={blurHandler}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {trimText(note.description)}
          </Typography>
        </CardContent>
        {renderButton()}
      </div>
    </Card>
  );
};

export default Notepaper;
