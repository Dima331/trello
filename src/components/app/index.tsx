import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getColumns } from '../../store/modules/columns/actions';
import { getNotes } from '../../store/modules/notes/actions';

import Navbar from '../navbar';
import DashBoard from '../dash-board';
import ModalWindow from '../modal-window';
import Spinner from '../spinner';

const App: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getColumns());
    dispatch(getNotes());
    setIsLoading(true);
  });

  return (
    <div>
      {!isLoading && <Spinner />}
      <Navbar />
      <DashBoard />
      <ModalWindow />
    </div>
  );
};

export default App;
