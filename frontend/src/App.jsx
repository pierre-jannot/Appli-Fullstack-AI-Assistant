import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom"
import './App.css'

import { Login } from './pages/Login'

function App() {
  const [logged,setLogged] = useState(false);
  const navigate = useNavigate();

  const toggleLogged = () => {
    setLogged(prev => !prev);
    navigate("/");
  }

  return (
      <Routes>
        <Route path="/" element={<Navigate to={!logged ? "/login" : "/home"}/>}/>
        <Route path="/login" element={<Login toggleLogged={toggleLogged}/>}/>
        <Route path="home" element={<h1 onClick={toggleLogged}>Se déconnecter</h1>}/>
      </Routes>
  )
}

export default App
