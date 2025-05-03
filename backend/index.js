const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
console.log('>> URL:', process.env.SPEAK_SPHERE_BOT_RUNPOD_URL);
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

const port = 8080;

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

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello World!' });
});

app.post('/chat', async (req, res) => {
  const message = req.body.input?.message;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    // Step 1: Submit job
    const runResponse = await axios.post(
      process.env.SPEAK_SPHERE_BOT_RUNPOD_URL,
      { input: { message } },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RUNPOD_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const jobId = runResponse.data.id;
    const statusUrl = `https://api.runpod.ai/v2/hvvrxz0iscol13/status/${jobId}`;

    // Step 2: Poll status
    let result;
    for (let i = 0; i < 20; i++) {
      // max 10s wait
      const statusRes = await axios.get(statusUrl, {
        headers: {
          Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
        },
      });

      if (statusRes.data.status === 'COMPLETED') {
        result = statusRes.data.output.response;
        break;
      } else if (statusRes.data.status === 'FAILED') {
        throw new Error('RunPod job failed');
      }

      await new Promise((r) => setTimeout(r, 500)); // wait 0.5s
    }

    if (!result) {
      res.status(408).json({ error: 'RunPod job timed out' });
      return;
    }

    res.json({ response: result });
  } catch (err) {
    console.error('RunPod API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//! USER
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
