import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from "./Pages/Home"
import LoginScreen from './Pages/Login';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<LoginScreen />} /> 
            
            <Route
              path="/radar"
              element={<ProtectedRoute component={Home} isAuthenticated={isAuthenticated} />}
            />
          </Routes>
    </div>
  );
}

export default App;
