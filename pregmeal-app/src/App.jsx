import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserHome from './components/UserHome'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
