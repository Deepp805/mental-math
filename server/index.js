const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors())

// Define endpoint to generate math equation
app.get('/generate-equation', (req, res) => {
    // let num1 = Math.floor(Math.random() * 100) + 1;
    // let num2 = Math.floor(Math.random() * 100) + 1;
    let r;
    let t1;
    let t2;

    // Generate random math operation (+, -, *, /)
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // Calculate answer based on the operation
    let answer;
    switch (operation) {
        case '+':
            r = Math.random();
            if (r > 0.5) {
                num1 = Math.floor(Math.random() * 100) + 1;
                num2 = Math.floor(Math.random() * 100) + 1;
            }
            else {
                num1 = Math.round(Math.random() * 100) /100
                num2 = Math.round(Math.random() * 100) /100
            }
            answer = num1 + num2;
            break;
        case '-':
            r = Math.random();
            if (r > 0.5) {
                num1 = Math.floor(Math.random() * 100) + 1;
                num2 = Math.floor(Math.random() * 100) + 1;
            }
            else {
                num1 = Math.round(Math.random() * 100) /100
                num2 = Math.round(Math.random() * 100) /100
            }
            t1 = Math.max(num1, num2)
            t2 = Math.min(num1, num2)
            num1 = t1
            num2 = t2
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            answer = num1 * num2;
            break;
        case '/':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            let times = num1 * num2
            answer = num1;
            num1 = times
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
