import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScores } from './api';
import { format } from 'date-fns';
import {Button} from '@chakra-ui/react';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

// Define the type for the score object
interface Score {
    id: number;
    score: number;
    length: number;
    userId: string;
    createdAt: string;
}

const ScoresPage: React.FC<{ uid: string }> = ({ uid }) => {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getScores(uid)
            .then((data) => {
                // Convert the object of objects to an array
                const scoresArray = Object.values(data as Record<string, Score>);
                setScores(scoresArray);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch scores:', error);
                setLoading(false);
            });
    }, [uid]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <Button colorScheme="blue" onClick={() => navigate('/')}>
                Go to Configuration Page
            </Button>
            <TableContainer>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Score</Th>
                            <Th>Test Length</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

    
                    {scores.length > 0 ? (
                        scores.map((score) => (
                            <Tr key={score.id}>
                                <Td>{format(new Date(score.createdAt), 'MMMM dd, yyyy')}</Td>
                                <Td>{score.score}</Td>
                                <Td>{score.length}</Td>
                            </Tr>
                        ))
                    ) : (
                            <Tr>
                                <Td colSpan={3}>No scores available.</Td>
                            </Tr>
                        )}

                    </Tbody>
                </Table>
            </TableContainer>
            
        </div>
    );
};

export default ScoresPage;
