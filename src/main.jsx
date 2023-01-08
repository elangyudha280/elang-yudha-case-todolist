import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import react router
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
