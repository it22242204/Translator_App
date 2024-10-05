import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
