import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  image: {
    width: '300px',
    height: '300px',
    backgroundSize: 'cover',
  },
  dropzone: {
    textAlign: 'center',
    padding: '20px',
    border: '3px dashed #eeeeee',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    marginBottom: '20px',
  },
}));

export default useStyles;
