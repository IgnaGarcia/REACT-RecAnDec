import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Shell } from './pages/Shell/Shell';
import UserProvider from './contexts/UserContext';
import UserConfigProvider from './contexts/UserConfigContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
      <UserConfigProvider>
        <Shell/>
      </UserConfigProvider>
    </UserProvider>
);
