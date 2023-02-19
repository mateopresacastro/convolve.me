import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyAudioContextProvider from './contexts/MyAudioContext.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyAudioContextProvider>
      <App />
    </MyAudioContextProvider>
  </React.StrictMode>
);
