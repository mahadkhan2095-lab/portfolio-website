import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { updateMetaTags } from './utils/updateMetaTags';

// Update meta tags from database (non-blocking)
// updateMetaTags().catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
