import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import { Shell } from './pages/Shell/Shell';
import UserProvider from './contexts/UserContext';
import ConfigProvider from './contexts/ConfigContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
      <ConfigProvider>
        <BrowserRouter className='flex'>
          <Shell/>
        </BrowserRouter>
      </ConfigProvider>
    </UserProvider>
);
