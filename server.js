// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple mock analysis function
function analyzeCode(code) {
  const errors = [];

  // Mock checks (you can expand this logic)
  if (!code.includes(';')) {
    errors.push({
      type: 'error',
      message: 'Missing semicolon',
      details: 'One or more statements are missing semicolons.',
      line: 1,
      fix: 'Add semicolons at the end of statements.'
    });
  }

  if (code.includes('var ')) {
    errors.push({
      type: 'warning',
      message: 'Use let or const instead of var',
      details: 'var is outdated, use let or const for block scoping.',
      line: 1,
      fix: 'Replace var with let or const.'
    });
  }

  if (code.includes('==')) {
    errors.push({
      type: 'suggestion',
      message: 'Use === instead of ==',
      details: 'Strict equality operator is recommended.',
      line: 1,
      fix: 'Replace == with ===.'
    });
  }

  // If no errors found, return empty array
  return errors;
}

app.post('/analyze', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const analysisResults = analyzeCode(code);

  res.json({ results: analysisResults });
});

app.listen(PORT, () => {
  console.log(Bug Buster backend running on port ${PORT});
});