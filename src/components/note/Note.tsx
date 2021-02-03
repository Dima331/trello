import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deleteNote } from '../../store/modules/notes/actions';
import { Notes } from '../../store/modules/notes/types';
import { openModal } from '../../store/modules/modal/actions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface NoteProps {
  note: Notes;
}

export const Note: React.FC<NoteProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function deleteNoteHandler(note: Notes): void {
    dispatch(deleteNote(note));
  }

  const editNoteHandler = (note: Notes): void => {
    dispatch(openModal(note))
  };

  return (
    <Card className={classes.root} style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.note.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.note.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => editNoteHandler(props.note)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deleteNoteHandler(props.note)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}