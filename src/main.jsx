import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PlayProvider } from './contexts/Play.jsx'
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayProvider>
      <App />
      <Analytics />
    </PlayProvider>
  </React.StrictMode>,
)
