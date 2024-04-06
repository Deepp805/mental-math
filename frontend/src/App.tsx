import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MathChallenge from './MathChallenge'
import ConfigurationPage from './ConfigurationPage'
import AppRouter from './AppRouter'

function App() {

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App


// Current issues to work on:
// - Add proper score to ResultsPage
// - Proper questions that are doable
// - Restarting test exits immediately