import React from 'react'
import Landingpage from './vendorDashboard/components/pages/Landingpage'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Notfound from './vendorDashboard/components/Forms/Notfound'
const App = () => {
  return (
    <div>
      <h1></h1>
      <Routes>
        <Route path='/' element={<Landingpage />}/>
        <Route path='/*' element={<Notfound/>} />
      </Routes>
      
    </div>
  )
}

export default App
