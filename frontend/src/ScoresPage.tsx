import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getScores } from './api';

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
            {/* <h1>Scores for {uid}</h1> */}
            {scores.length > 0 ? (
                <ul>
                    {scores.map((score) => (
                        <li key={score.id}>Score: {score.score} Duration: {score.length}</li>
                    ))}
                </ul>
            ) : (
                <p>No scores available.</p>
            )}
            <Link to="/">Go to Configuration Page</Link>
        </div>
    );
};

export default ScoresPage;
