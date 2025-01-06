import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 

import Home from "./Pages/Home"
import LoginScreen from './Pages/Login';

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<LoginScreen />} /> 
            <Route path="/radar" element={<Home />}/>
          </Routes>
    </div>
  );
}

export default App;
