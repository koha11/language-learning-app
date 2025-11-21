import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/core/htpp/authInterceptor';
import '@/core/htpp/errorInterceptor';

import './index.css';
import App from './App';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
