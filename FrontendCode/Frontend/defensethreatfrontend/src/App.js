import React, { useState } from 'react';
import { BrowserRouter as   Router,Route, Routes, Navigate } from 'react-router-dom';

import RadarPage from './Pages/Radar';
import LoginScreen from './Pages/Login';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};


function App() {
  const [isAuthenticated] = useState(true); 

  
 
  
  

  return (
    <div className="App">
  
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
              path="/radar"
              element={<ProtectedRoute component={RadarPage} isAuthenticated={isAuthenticated} />}
            />
        </Routes>
      </Router>
  </div>
  );
}

export default App;
