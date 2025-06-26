import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import App from './App.jsx';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);