import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom"
import './App.css'

import { Login } from './pages/Login'
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/aichat" element={
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>}/>
      </Routes>
  )
}

export default App
