import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from './Map';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>
);

reportWebVitals();
