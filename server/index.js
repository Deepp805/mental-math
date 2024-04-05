const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors())

// Define endpoint to generate math equation
app.get('/generate-equation', (req, res) => {
    // Generate random numbers between 1 and 100
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;

    // Generate random math operation (+, -, *, /)
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // Calculate answer based on the operation
    let answer;
    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = num1 / num2;
            break;
    }

    // Round answer to 2 decimal places
    answer = Math.round(answer * 100) / 100;

    console.log(`This is the equation being sent ${num1} ${operation} ${num2}. This is the answer: ${answer}`);

    // Send response with generated equation and answer
    res.json({
        equation: `${num1} ${operation} ${num2}`,
        answer: answer
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
