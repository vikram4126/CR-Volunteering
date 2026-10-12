import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function mountApp() {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    // If #root is not yet in DOM, wait for DOMContentLoaded or polling check
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', mountApp);
    } else {
      setTimeout(mountApp, 50);
    }
  }
}

mountApp();
