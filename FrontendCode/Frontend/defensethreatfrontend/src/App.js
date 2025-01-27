import React from 'react';
import { BrowserRouter as   Router,Route, Routes} from 'react-router-dom';

import RadarPage from './Pages/Radar';
import LoginScreen from './Pages/Login';




function App() {


 
  
  

  return (
    <div className="App">
  
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
              path="/radar"
              element={<RadarPage/>}
            />
        </Routes>
      </Router>
  </div>
  );
}

export default App;
