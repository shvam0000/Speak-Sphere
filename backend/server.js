const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 8080; // Use the port of your choice

app.use(bodyParser.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://admin:admin@node-rest-shop.5kcqy.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const systemMessage = {
    role: 'system',
    content: '¿Te gusta comer comida mexicana?',
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

// send the user data to mongodb
app.post('/user', (req, res) => {
  const _user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    gender: req.body.age,
    interests: req.body.interests,
  });
  _user
    .save()
    .then((result) => {
      res.status(201).json({
        _id: result._id,
        name: result.name,
        age: result.age,
        gender: result.gender,
        interests: result.interests,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// get the user data from mongodb
app.get('/user', (req, res) => {
  User.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'An error occurred',
      });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
