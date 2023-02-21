import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/Auth.context';
import { NotificationProvider } from './wrappers/notification/Notification.wrapper';
import { ModalProvider } from './wrappers/modal/Modal.wrapper';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);
