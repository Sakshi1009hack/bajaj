const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(require("cors")({ origin: "http://localhost:3001" }));

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

app.post('/process-data', (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const lowercase = alphabets.filter((char) => char === char.toLowerCase());
  
  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers.map(String),
    alphabets,
    highest_lowercase_alphabet: lowercase.sort().reverse()[0] ? [lowercase[0]] : [],
    is_prime_found: numbers.some((num) => isPrime(Number(num))),
    file_valid: !!file_b64,
    file_mime_type: 'image/png',
    file_size_kb: 400
  });
});

app.get('/process-data', (req, res) => res.send({ operation_code: "1" }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
