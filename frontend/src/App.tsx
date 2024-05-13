import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import SignInPage from './SignInPage';

axios.defaults.baseURL = 'https://mental-math-jieg.onrender.com';

function App() {
  const { isSignedIn, user } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isSignedIn && user && !isRegistering) {
      setIsRegistering(true); // Set loading state to prevent multiple requests

      axios.post('/register', {
        user_id: user.id,
        user_email: user.primaryEmailAddress?.toString()
      })
      .then(response => {
        console.log("User registered successfully:", response);
      })
      .catch(error => {
        console.error("Failed to register user:", error);
      })
      .finally(() => {
        setIsRegistering(false); // Reset loading state
      });
    }
  }, [isSignedIn, user]); // Only re-run the effect if isSignedIn or user changes

  return (
    <>
      <SignedIn>
        <AppRouter />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  );
}

export default App;



// Current issues to work on:
// - Use tailwindcss to style the app and also style the Clerk components
// - Consider the type of the test (add/subtract only or everything) in the DB
// - Visualize historic test results in profile page
// - A cool thing would be a public leaderboard for the time controls
