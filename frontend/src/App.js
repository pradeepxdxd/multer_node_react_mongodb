import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}
