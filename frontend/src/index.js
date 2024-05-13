import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { UserProvider } from './context/authContext';
import { AdminProvider } from './context/authAdminContext';
import { SellerProvider } from './context/AuthSellerContext';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <SellerProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </SellerProvider>
    </AdminProvider>
  </React.StrictMode >
);
defineCustomElements(window);
