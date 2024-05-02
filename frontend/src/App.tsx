import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const { isSignedIn, user } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isSignedIn && user && !isRegistering) {
      setIsRegistering(true); // Set loading state to prevent multiple requests
      console.log("This is the user Id:" + user.id);
      console.log("This is their email address: " + user.primaryEmailAddress?.toString());

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
        <SignInButton />
      </SignedOut>
    </>
  );
}

export default App;



// Current issues to work on:
// - Integrate Google Analytics to see how many tests have been done
// - Add user login [done]
// - Use tailwindcss to style the app and also style the Clerk components
// - Store user test results into db
// - Visualize historic test results in profile page
