import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/main.css';
import App from './App.js';
import { UserProvider } from './contextos/UserContext.js';
import { SoundProvider } from './contextos/SoundContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SoundProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </SoundProvider>
);