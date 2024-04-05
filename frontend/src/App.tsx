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
// - Answer box doesn't clear after correct answer
// Restarting test exits immediately