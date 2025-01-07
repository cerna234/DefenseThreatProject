import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App';  // Importing App component
import { BrowserRouter } from 'react-router-dom';  // Importing BrowserRouter from react-router-dom

// Create a root using ReactDOM.createRoot and pass the DOM element with the id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root using the .render() method
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);