import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { CompanyProvider } from './context/CompanyContext';
import axiosInstance from './api/axios';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <ThemeProvider>
      <CompanyProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </CompanyProvider>
    </ThemeProvider>
  );
}

export default App;
