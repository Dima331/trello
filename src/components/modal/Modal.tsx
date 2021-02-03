import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Form } from '../form/Form';
import { RootState } from '../../store/modules/combineReducers';
import {
  closeModal
} from '../../store/modules/modal/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export const ModalWindow: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stateModal = useSelector((state: RootState) => state.modal.state);

  const handleClose = (): void => {
    dispatch(closeModal())
  };

  return (
    <div>
      {stateModal &&
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={stateModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={stateModal}>
            <div className={classes.paper}>
              <Form />
            </div>
          </Fade>
        </Modal>
      }
    </div>
  );
}