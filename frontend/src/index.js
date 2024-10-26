import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

// renders website when DOM is loaded! Yippee!!
//strict mode renders elements twice so that any elements depending on others that fail would be spotted
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
