import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Login } from './components/Login.jsx'

function App() {
  const [logged, setLogged] = useState(false)

  const toggleLogged = () => {
    setLogged(prev => !prev);
  }

  return (
    <>
      {!logged && (<Login></Login>)}
    </>
  )
}

export default App
