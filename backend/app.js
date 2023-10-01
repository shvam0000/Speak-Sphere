const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.GPT_KEY });

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/healthcheck', (req, res) => {
  res.status(200).json({
    message: 'API OK',
  });
});

app.post('/converse', (req, res) => {
  const input = req.body.input;
  const _prompt = `${input}`;
  if (!_prompt) {
    res.status(400).json({ error: 'Prompt missing' });
  }

  try {
    async function main() {
      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: _prompt,
        max_tokens: 100,
        temperature: 0,
      });

      console.log(completion);
      res.status(200).json({
        res: completion,
      });
      console.log(_prompt);
    }
    main();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Translate any text to english
app.post('/translate', (req, res) => {
  const text = req.body.text;
  const _prompt = `Please translate this in English - ${text}`;

  if (!_prompt) {
    res.status(400).json({ error: 'Prompt missing' });
  }

  try {
    async function main() {
      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `can you please translate this in english - ${_prompt}`,
        max_tokens: 100,
        temperature: 0,
      });

      console.log(completion);
      console.log(_prompt);
    }
    main();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
