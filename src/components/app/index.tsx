import React from 'react';

import Navbar from '../navbar';
import DashBoard from '../dash-board';
import ModalWindow from '../modal-window';

const App: React.FC = (): React.ReactElement => (
  <div>
    <Navbar />
    <DashBoard />
    <ModalWindow />
  </div>
);

export default App;
