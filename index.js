const express = require('express');
const bodyParser = require('body-parser');

const talkerManager = require('./talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

//! não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const response = await talkerManager();
  const talkers = JSON.parse(response);

  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const response = JSON.parse(await talkerManager());
  const selectedTalker = response.find((talker) => talker.id === Number(id));
  
  if (!selectedTalker) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(selectedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
