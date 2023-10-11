const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080; // Use the port of your choice

app.use(bodyParser.json());
app.use(cors());

const API_KEY = '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';

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const systemMessage = {
    role: 'system',
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, { role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    res.json({ message: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
