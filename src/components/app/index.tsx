import React from 'react';

import Navbar from '../navbar';
import Dashboard from '../dashboard';
import ModalWindow from '../modal-window';

const App: React.FC = (): React.ReactElement => (
  <>
    <Navbar />
    <Dashboard />
    <ModalWindow />
  </>
);

export default App;
