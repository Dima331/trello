import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { deleteNote } from '../../store/modules/notes/actions';
import { editOpenModal } from '../../store/modules/modal/actions';
import { Note } from '../../store/modules/notes/types';

import useStyles from './styles';

interface NoteProps {
  note: Note;
}

const MAX_LENGHT = 350;

const Notepaper: React.FC<NoteProps> = ({ note }: NoteProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function deleteNoteHandler(): void {
    dispatch(deleteNote(note));
  }

  const editNoteHandler = (): void => {
    dispatch(editOpenModal(note));
  };

  const trimTextHelper = useCallback(() => {
    if (note.description) {
      if ((note.description).length > MAX_LENGHT) {
        return `${(note.description).substring(0, MAX_LENGHT - 3)}...`;
      }

      return note.description;
    }

    return null;
  }, [note]);

  return (
    <Card className={classes.card} style={{ backgroundColor: note.color }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {note.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {trimTextHelper()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => editNoteHandler()}
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
    </Card>
  );
};

export default Notepaper;
