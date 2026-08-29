// Entry point for React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'highlight.js/styles/github.css';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
