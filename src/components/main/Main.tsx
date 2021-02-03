import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { RootState } from '../../store/modules/combineReducers';
import { addColumn } from '../../store/modules/columns/actions';
import { Column } from "../column/Column";
import { IColumn } from '../../store/modules/modal/types';
import { ModalWindow } from "../modal/Modal";
import {
  activeColumnModal
} from '../../store/modules/modal/actions';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '90vh',
    padding: '20px',
    display: ' flex',
    alignItems: 'self-end',
  },
});

export const Main: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.column.columns);

  function lastId(): number {
    return columns[columns.length - 1] ? columns[columns.length - 1].id + 1 : 1;
  }

  const addColumnHandler = () => {
    dispatch(addColumn({ id: lastId() }))
  }

  const handleOpen = (columnId: IColumn): void => {
    dispatch(activeColumnModal(columnId))
  };

  return (
    <>
      <Container maxWidth="md">
        <div className={classes.root}>
          {columns && columns.map((column) => (
            <div key={column.id}>
              <li>
                <Column columnId={column.id} />
              </li>
              <Button
                size="small"
                color="primary"
                onClick={() => handleOpen({ columnId: column.id })}
              >
                Add note
              </Button>
            </div>
          ))}
          <Button
            size="small"
            color="primary"
            onClick={() => addColumnHandler()}
          >
            Add column
        </Button>
        </ div>
      </Container>
      <ModalWindow />
    </>
  );
}