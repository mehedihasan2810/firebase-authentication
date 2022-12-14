import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserAuthProvider } from './firebaseAuth/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserAuthProvider>
    <App />
    </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
