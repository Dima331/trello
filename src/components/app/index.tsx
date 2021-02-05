import React from 'react';

import Navbar from '../navbar';
import DashBoard from '../dashBoard';
import ModalWindow from '../modalWindow';

const App: React.FC = (): React.ReactElement => (
  <div className="App">
    <Navbar />
    <DashBoard />
    <ModalWindow />
  </div>
);

export default App;
