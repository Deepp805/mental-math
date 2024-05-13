import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Button } from 'flowbite-react';

const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-teal-300 to-blue-500 min-h-screen w-screen">
      <Box 
        className="space-y-4 p-8 bg-white shadow-md rounded-lg"
      >
        <Heading as="h1" size="xl">Welcome to Quick Maths</Heading>
        <Text textAlign="center" fontSize="md">Sign in to start practicing your mental math skills!</Text>
        <SignInButton>
            <Button className="w-full" color="primary">Sign In</Button>
        </SignInButton>
      </Box>
    </div>
  );
}

export default SignInPage;
