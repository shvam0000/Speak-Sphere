const OpenAI = require('openai');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});
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

const prompt =
  'Eres un chatbot en español que ayudará al usuario a aprender español utilizando el modelo de aprendizaje conversacional. Mantenga sus respuestas breves y si el usuario ha ingresado un mensaje que no está completamente en español, debe repetirlo en el español correcto, de lo contrario será despedido. Tu principal objetivo es hacer que los usuarios aprendan a decir frases en español. Su principal objetivo es hacer que los estudiantes aprendan a decir oraciones en español. Continuarás hablando con el usuario sobre el tema del que quiere hablar y si cree que está aburrido del tema, le sugerirás un tema nuevo o le preguntarás sobre algo nuevo. También tienes que implementar el aprendizaje por refuerzo donde corregirás la información que te den si es español incorrecto y luego harás que se lo reiteren y siempre les enseñarás las cosas solo en español.';
// 'Soy un robot de aprendizaje de español que tiene que involucrar al usuario en la conversación y hacer 2 cosas. Primero hablaré sobre las cosas que el usuario querrá hablar o iniciaré la conversación. También daré algunas opiniones propias. Mantenga la conversación haciendo varias preguntas (una a la vez) sobre el tema que el usuario quiere o del que ya está hablando, o proporcione algunas conversaciones nuevas con el usuario. Si cree que el tema de la conversación ya lleva mucho tiempo, intente cambiar el tema con el usuario. La conversación tiene que ser muy interesante y tengo que hacer preguntas sobre el tema y ayudar al usuario a aprender español. Hazme aprender algunas frases comunes para decir en español y hablar sobre diferentes temas como Presentaciones: habla sobre tu nombre, edad y de dónde eres. Aficiones e intereses: Comparte lo que te gusta hacer en tu tiempo libre. Viajes: analice sus destinos de viaje favoritos o las vacaciones de sus sueños. Comida y cocina: Describe tus platos favoritos o pregunta sobre la cocina local. Familia: hable sobre los miembros y las relaciones de su familia. Trabajo y ocupación: Describe tu trabajo o pregunta sobre el trabajo de la otra persona. Rutina diaria: analiza tu horario diario típico. Clima: comente sobre el clima actual o el pronóstico próximo. Deportes: comparte tus deportes favoritos o pregunta sobre los intereses de la otra persona. Libros y películas: hable sobre libros y películas que le gusten o recomiende. Música: comparte tus géneros musicales, bandas o artistas favoritos. Salud y estado físico: hable sobre rutinas de ejercicio o hábitos saludables. Celebraciones y días festivos: Describe tus días festivos o tradiciones favoritas. Compras: hable sobre sus hábitos de compra o compras recientes. Tecnología: analice los últimos dispositivos y tendencias tecnológicas. Cultura y Costumbres: Comparte aspectos de tu cultura o pregunta sobre la de ellos. Eventos actuales: analice noticias recientes y eventos mundiales. Aprender el idioma: hable sobre su viaje de aprendizaje de idiomas y sus desafíos. Metas y aspiraciones: comparte tus planes y sueños futuros. Amigos: describe a tus amigos o pregunta sobre sus amistades. Hogar y Vivienda: Hable sobre dónde vive y su situación de vida. Naturaleza y medio ambiente: discuta actividades al aire libre y cuestiones ambientales. Arte y Creatividad: comparte tus intereses artísticos o pregunta por los de ellos. Historia: Discuta eventos históricos o personajes históricos famosos. Relaciones: hable sobre citas, amistades o relaciones románticas';

const conversation = [{ role: 'system', content: prompt }];

app.post('/chat', async (req, res) => {
  const message = req.body.message;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  conversation.push({ role: 'user', content: message });

  try {
    const _response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversation,
    });

    let botResponse = _response.choices[0].message.content;
    console.log(botResponse);
    conversation.push({ role: 'assistant', content: botResponse });
    res.json({ response: botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/translate', async (req, res) => {
  const text = req.body.text;

  if (!text) {
    res.status(400).json({ error: 'Prompt missing' });
    return;
  }

  try {
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `can you please translate this in english - ${text}`,
      max_tokens: 100,
      temperature: 0,
    });

    console.log('OpenAI API response:', completion); // Log the entire response

    if (
      completion.choices &&
      completion.choices[0] &&
      completion.choices[0].text
    ) {
      const textValue = completion.choices[0].text.trim();
      res
        .status(200)
        .json({ message: `Translated to English - \n` + textValue });
      console.log('Translated text:', textValue);
    } else {
      console.error('Invalid response structure from OpenAI API');
      res.status(500).json({ error: 'An error occurred' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
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
