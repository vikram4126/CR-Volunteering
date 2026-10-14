import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function fixDialogueParentHeight() {
  try {
    const container = document.getElementById('root') || document.querySelector('.app-container');
    if (!container) return;
    const scriptWrapper = container.closest('div[comptype="script"], [comptype="script"]');
    if (scriptWrapper) {
      scriptWrapper.style.setProperty('height', 'auto', 'important');
      scriptWrapper.style.setProperty('min-height', 'auto', 'important');
    }
  } catch (e) {
    console.warn('Dialogue height adjustment:', e);
  }
}

function mountApp() {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    fixDialogueParentHeight();
    setTimeout(fixDialogueParentHeight, 150);
    setTimeout(fixDialogueParentHeight, 500);
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

