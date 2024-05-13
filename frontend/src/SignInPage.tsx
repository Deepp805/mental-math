import React, { useEffect, useState } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { format } from 'date-fns';
import { fetchTopScores } from './api';


interface Score {
    id: number;
    score: number;
    createdAt: Date;
}

const SignInPage: React.FC = () => {
  const [scores30, setScores30] = useState<Score[]>([]);
  const [scores60, setScores60] = useState<Score[]>([]);
  const [scores90, setScores90] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresFor30 = await fetchTopScores(30);
        const scoresFor60 = await fetchTopScores(60);
        const scoresFor90 = await fetchTopScores(90);
        setScores30(scoresFor30);
        setScores60(scoresFor60);
        setScores90(scoresFor90);
      } catch (error) {
        console.error('Failed to load top scores:', error);
      }
    };
    fetchScores();
  }, []);

  const renderScoresTable = (scores: Score[], duration: number) => (
    <TableContainer>
      <Table variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scores.map((score, index) => (
            <Tr key={score.id}>
              <Td>{format(new Date(score.createdAt), 'MMMM dd, yyyy p')}</Td>
              <Td>{score.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-teal-300 to-blue-500 min-h-screen w-screen">
      <Box className="space-y-4 p-8 bg-white shadow-md rounded-lg">
        <Heading as="h1" size="xl">Welcome to Quick Maths</Heading>
        <Text fontSize="md" textAlign="center">Sign in to start practicing your mental math skills!</Text>
        <SignInButton />
        <Heading as="h2" size="lg" textAlign="center" mt="8">Leaderboard</Heading>
        {renderScoresTable(scores30, 30)}
        {renderScoresTable(scores60, 60)}
        {renderScoresTable(scores90, 90)}
      </Box>
    </div>
  );
};

export default SignInPage;
