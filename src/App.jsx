import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Home from './pages/Dashboard/Home'
import Blog from './pages/Dashboard/Blog'
import ProtectedRoutes from './componets/ProtectedRoutes'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<ProtectedRoutes><Blog /></ProtectedRoutes>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App