import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Main } from "./components/main/Main";
import './App.css';

export const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}
