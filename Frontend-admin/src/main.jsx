import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

// Force clear any stale dark mode state from previous sessions
localStorage.removeItem('layoutMode');
localStorage.removeItem('theme_reset_to_light');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,

        style: {
          background: "#fff",
          color: "#333",
          fontWeight: "600",
          padding: "16px",
          borderRadius: "12px",
        },

        success: {
          duration: 4000,
        },

        error: {
          duration: 5000,
        },
      }}
    />
  </StrictMode>,
)
