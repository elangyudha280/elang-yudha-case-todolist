import { useState } from 'react'

import { Outlet } from 'react-router-dom'

// COMPONENT NAVBAR
import Navbar from './component/navbar'

function App() {

  return (
    <div className="App">
      <Navbar/>

      <Outlet/>
    </div>
  )
}

export default App
