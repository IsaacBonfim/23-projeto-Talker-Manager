const express = require('express');
const bodyParser = require('body-parser');
const { promises } = require('fs');

const listTalkers = require('./talker');
const getToken = require('./createToken');
const tokenValidation = require('./tokenValidation');
const { emailValidation, passwordValidation } = require('./loginValidation');
const { nameValidation, ageValidation, talkValidation,
  watchDateValidation } = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

//! não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = JSON.parse(await listTalkers());

  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const response = JSON.parse(await listTalkers());
  const selectedTalker = response.find((talker) => talker.id === Number(id));
  
  if (!selectedTalker) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(selectedTalker);
});

app.post('/login', 
  emailValidation,
  passwordValidation,
  (req, res) => {
    res.status(200).json({ token: getToken() });
});

app.use(tokenValidation);

app.post('/talker',
  nameValidation,
  ageValidation,
  talkValidation,
  watchDateValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const list = JSON.parse(await listTalkers());
    const id = list.length + 1;

    list.push({ id, name, age, talk });

    await promises.writeFile('./talker.json', JSON.stringify(list));

    res.status(201).json({ id, name, age, talk });
});

app.listen(PORT, () => {
  console.log('Online');
});
