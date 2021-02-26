import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: '20px',
    position: 'relative',
  },
  media: {
    height: 140,
  },
  focus: {
    '&:focus': {
      border: '4px solid #000',
    },
  },
  notFocus: {
    '&:focus': {
      outline: 'none',
    },
  },
  mark: {
    height: 140,
    position: 'absolute',
    top: '5px',
    right: '10px',
  },
  image: {
    width: '50px',
    height: '50px',
    backgroundSize: 'cover',
  },
});

export default useStyles;
