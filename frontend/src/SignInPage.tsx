import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Brain, Trophy, ArrowRight, Calculator, Clock } from 'lucide-react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { fetchTopScores } from './api';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

interface Score {
  id: number;
  score: number;
  createdAt: Date;
}

export default function LandingPage() {
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
    <Card className="w-full bg-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-bold">
          <Clock className="mr-2" />
          {duration} Seconds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Date and Time</TableHead>
              <TableHead className="text-white">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score) => (
              <TableRow key={score.id}>
                <TableCell className="text-white">{format(new Date(score.createdAt), 'MMMM dd, yyyy p')}</TableCell>
                <TableCell className="text-white font-bold">{score.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-4 text-white">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="inline-block transform -rotate-3 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg">
              Quick Maths
            </span>
          </h1>
          <p className="text-xl text-blue-200">
            Sharpen Your Mind, One Equation at a Time!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-none">
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white cursor-pointer">
                <SignInButton>
                  <div className="flex items-center cursor-pointer">
                    <Calculator className="mr-2 h-5 w-5" />
                      Sign In
                  </div>
                </SignInButton>
              </Button>
            
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 cursor-pointer" style={{ userSelect: 'none' }}>
                <SignUpButton>
                  <div className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                      Sign Up
                  </div>
                </SignUpButton>
              </Button>
              
            
            </div>
            <Button asChild size="lg" className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-500">
              <Link to="/configuration">
                Try as Guest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center flex items-center justify-center">
            <Trophy className="mr-2 h-8 w-8 text-yellow-400" />
            Leaderboard
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {renderScoresTable(scores30, 30)}
            {renderScoresTable(scores60, 60)}
            {renderScoresTable(scores90, 90)}
          </div>
        </div>
      </div>
    </div>
  );
}