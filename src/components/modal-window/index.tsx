import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { closeModal } from '../../store/modules/modal/actions';
import Form from '../form';
import {
  removeActiveNote,
} from '../../store/modules/notes/actions';

import ModalWindowSelector from './selectors';
import useStyles from './styles';

const TIME_OUT = 500;

const ModalWindow: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isModalOpen } = useSelector(ModalWindowSelector);

  const closeHandler = useCallback((): void => {
    dispatch(closeModal());
    dispatch(removeActiveNote());
  }, []);

  return (
    <div>
      {isModalOpen && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalOpen}
          onClose={closeHandler}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: TIME_OUT,
          }}
        >
          <Fade in={isModalOpen}>
            <div className={classes.paper}>
              <Form />
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default ModalWindow;
