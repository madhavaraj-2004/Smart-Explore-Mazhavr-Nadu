import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import './styles.css'; // Your main stylesheet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CustomCursor />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
