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
// - Integrate Google Analytics to see how many tests have been done
// - Add user login
// - Store user test results into db
// - Visualize historic test results in profile page
