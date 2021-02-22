import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { addColumn } from '../../store/modules/columns/actions';
import noteDragService from '../../services/noteDragService';
import imagesConfig from '../../config/images';
import Column from '../column';

import DashboardSelector from './selectors';
import useStyles from './styles';

const Dashboard: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { columns, background } = useSelector(DashboardSelector);

  const addColumnHandler = useCallback((): void => {
    dispatch(addColumn());
  }, []);

  const onDragEnd = (result: DropResult): void => {
    noteDragService.dragEnd(result);
  };

  const renderColumns = useCallback((): JSX.Element => {
    return (
      <DragDropContext onDragEnd={result => (onDragEnd(result))}>
        {columns
          .map((column) => (
            <div key={column.id}>
              <li>
                <Column
                  columnId={column.id}
                  notesInColumn={column.notes}
                />
              </li>
            </div>
          ))}
      </DragDropContext>
    );
  }, [columns]);

  return (
    <div
      className={classes.background}
      style={{ backgroundImage: background ? `url(${imagesConfig[background - 1].path})` : '' }}
    >
      <Container maxWidth="md">
        <div className={classes.containerBoard}>
          {renderColumns()}
          <Button
            size="small"
            color="primary"
            onClick={addColumnHandler}
          >
            Add column
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
