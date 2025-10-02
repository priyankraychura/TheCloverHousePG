import React from 'react'
import MainPage from './pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' Component={MainPage}/>
        <Route path='/contact' Component={ContactPage}/>
        <Route path='/bookings' Component={BookingPage}/>
      </Routes>
    </div>
  )
}

export default App
