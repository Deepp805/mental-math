import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MathChallenge from './MathChallenge'
import ConfigurationPage from './ConfigurationPage'
import AppRouter from './AppRouter'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {

  return (
    <>
      <SignedIn>
        <AppRouter />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}

export default App


// Current issues to work on:
// - Integrate Google Analytics to see how many tests have been done
// - Add user login [done]
// - Use tailwindcss to style the app and also style the Clerk components
// - Store user test results into db
// - Visualize historic test results in profile page
