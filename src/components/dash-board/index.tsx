import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { addColumn } from '../../store/modules/columns/actions';
import Column from '../column';

import ColumnSelector from './selectors';
import useStyles from './styles';

const DashBoard: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { columns } = useSelector(ColumnSelector);

  const getLastId = useCallback((): number => {
    return columns[columns.length - 1] ? columns[columns.length - 1].id + 1 : 1;
  }, [columns]);

  const addColumnHandler = () => {
    dispatch(addColumn({ id: getLastId() }));
  };

  return (
    <Container maxWidth="md">
      <div className={classes.containerBoard}>
        {columns && columns.map((column) => (
          <div key={column.id}>
            <li>
              <Column columnId={column.id} />
            </li>
          </div>
        ))}
        <Button
          size="small"
          color="primary"
          onClick={() => addColumnHandler()}
        >
          Add column
        </Button>
      </div>
    </Container>
  );
};

export default DashBoard;
