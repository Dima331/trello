import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

import { editOpenModal } from '../../store/modules/modal/actions';
import {
  deleteInColumn,
  activeNote,
  removeActiveNote,
  expiredNote,
} from '../../store/modules/columns/actions';
import { Note } from '../../types/Notes';
import { trimText } from '../../helpers/stringHelper';
import { getFormatDate, isDateExpired } from '../../helpers/dateHelpers';
import noteBehaviorService from '../../services/noteBehaviorService';

import useStyles from './styles';

const INTERVAL_CHECK_DATE = 3000;

interface NoteProps {
  note: Note;
  columnId: number;
  index: number;
}

const Notepaper: React.FC<NoteProps> = ({
  note,
  columnId,
  index,
}: NoteProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputNote = useRef<HTMLHeadingElement>(null);

  const [hover, setHover] = useState<boolean>(false);

  useEffect((): void => {
    if (!note.time) {
      const timer: ReturnType<typeof setInterval> = setInterval((): void => {
        const expired = isDateExpired(note.date as Date);

        if (expired) {
          dispatch(expiredNote(columnId, note));
          clearTimeout(timer);
        }
      }, INTERVAL_CHECK_DATE);
    }
  }, []);

  useEffect((): void => {
    if (note && note.active) {
      if (inputNote.current) {
        inputNote.current.focus();
      }
    }
  });

  const deleteNoteHandler = useCallback((): void => {
    dispatch(deleteInColumn(columnId, note.id));
  }, [note]);

  const editNoteHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(editOpenModal(columnId, note));
  }, [note, columnId]);

  const focusNoteHanlder = useCallback((): void => {
    dispatch(activeNote(columnId, note.id));
  }, [note]);

  const blurNoteHandler = useCallback((): void => {
    dispatch(removeActiveNote());
  }, []);

  const enterNoteHandler = useCallback((event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();

    noteBehaviorService.handleKeyPress(event.keyCode, note, columnId);
    setHover(false);
  }, [note, columnId]);

  const upHoverHandler = useCallback((): void => {
    setHover(true);
  }, []);

  const downHoverHandler = useCallback((): void => {
    setHover(false);
  }, []);

  const renderControls = useCallback((): JSX.Element => {
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

    return (
      <div style={{ height: '46px' }} />
    );
  }, [hover]);

  return (
    <Draggable
      key={note.id}
      draggableId={String(note.id)}
      index={index}
    >
      {(provided) => {
        return (
          <div
            aria-hidden="true"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              className={classes.card}
              style={{ backgroundColor: note.color }}
              onMouseEnter={upHoverHandler}
              onMouseLeave={downHoverHandler}
            >
              <div
                className={note.active ? classes.focus : classes.notFocus}
                onClick={focusNoteHanlder}
                onKeyDown={enterNoteHandler}
                ref={inputNote}
                tabIndex={0}
                onBlur={blurNoteHandler}
              >
                <CardContent>
                  <Typography
                    component="p"
                    className={classes.mark}
                  >
                    {note.marker}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {trimText(note.description)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {note.date && getFormatDate(note.date)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {note.time ? 'you don\'t have time' : 'you have time'}
                  </Typography>
                  {note.image && (
                    <Typography variant="body2" color="textSecondary" component="p">
                      <img src={note.image} alt="img" className={classes.image} />
                    </Typography>
                  )}
                </CardContent>
                {renderControls()}
              </div>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Notepaper;
