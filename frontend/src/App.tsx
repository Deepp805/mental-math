import './App.css'
import AppRouter from './AppRouter'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) {
    console.log("This is the user Id:" + user.id);
    console.log("This is their email address: " + user.primaryEmailAddress);
    axios.post('/register', {
      user_id: user.id,
      user_email: user.primaryEmailAddress?.toString()
    })
  }

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
