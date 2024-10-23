import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: If you have global styles

const rootElement = document.getElementById('root');

// Ensure the root element exists
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
