import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import react router
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<p>dashboard activity</p>}/>
          <Route path='detail/:id' element={<p>detal..</p>}/>
        </Route> 
        <Route path='*' element={<p>not found</p>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
