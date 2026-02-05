import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom"
import './App.css'

import { Login } from './pages/Login'
import { AIAssistantPage } from "./pages/AIAssistantPage";

function App() {
  const [logged,setLogged] = useState(false);
  const navigate = useNavigate();

  const toggleLogged = () => {
    if (logged){
      localStorage.removeItem("token");
    }
    setLogged(prev => !prev);
    navigate("/");
  }

  return (
      <Routes>
        <Route path="/" element={<Navigate to={!logged ? "/login" : "/aichat"}/>}/>
        <Route path="/login" element={<Login toggleLogged={toggleLogged}/>}/>
        <Route path="/aichat" element={<AIAssistantPage toggleLogged={toggleLogged}/>}/>
      </Routes>
  )
}

export default App
