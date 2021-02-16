import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { addColumn } from '../../store/modules/columns/actions';
import Column from '../column';
import images from '../../config/images';

import ColumnSelector from './selectors';
import useStyles from './styles';

const DashBoard: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { columns, cover } = useSelector(ColumnSelector);

  const addColumnHandler = useCallback((): void => {
    dispatch(addColumn());
  }, []);

  const renderColumns = useCallback(() => (
    columns
      .map((column) => (
        <div key={column.id}>
          <li>
            <Column columnId={column.id} />
          </li>
        </div>
      ))
  ), [columns]);

  return (
    <div
      className={classes.background}
      style={{ backgroundImage: `url(${images[cover - 1].path})` }}
    >
      <Container maxWidth="md">
        <div className={classes.containerBoard}>
          {renderColumns()}
          <Button
            size="small"
            color="primary"
            onClick={addColumnHandler}//
          >
            Add column
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
