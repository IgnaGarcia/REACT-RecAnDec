import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Shell } from './pages/Shell/Shell';
import UserProvider from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Shell/>
    </UserProvider>
  </React.StrictMode>
);
