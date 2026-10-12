import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function fixDialogueParentHeight() {
  const container = document.getElementById('root') || document.querySelector('.app-container');
  if (!container) return;
  let el = container.parentElement;
  while (el && el !== document.body && el !== document.documentElement) {
    el.style.setProperty('height', 'auto', 'important');
    el.style.setProperty('min-height', 'auto', 'important');
    el.style.setProperty('overflow', 'visible', 'important');
    el = el.parentElement;
  }
  document.querySelectorAll('div[comptype="script"], [comptype="script"], preview-script, .preview-component-child').forEach(el => {
    el.style.setProperty('height', 'auto', 'important');
    el.style.setProperty('min-height', 'auto', 'important');
    el.style.setProperty('overflow', 'visible', 'important');
  });
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

