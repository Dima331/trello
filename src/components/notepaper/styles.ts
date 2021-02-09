import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: '20px',
  },
  media: {
    height: 140,
  },
  focus: {
    '&:focus': {
      border: '4px solid #000',
    },
  },
});

export default useStyles;
