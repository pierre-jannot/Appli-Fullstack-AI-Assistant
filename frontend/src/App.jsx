import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { LoginPage } from './components/LoginPage.jsx'

function App() {
  const [logged, setLogged] = useState(false)

  const toggleLogged = () => {
    setLogged(prev => !prev);
  }

  return (
    <>
      {!logged && (<LoginPage></LoginPage>)}
    </>
  )
}

export default App
