function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function watchDateValidation(date, res) {
  const validate = /\d{2}\/\d{2}\/\d{4}/g;

  if (!date) {
    return res.status(400)
      .json({ message: 'message": "O campo "watchedAt" é obrigatório' });
  }

  if (!validate.test(date)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function rateValidation(rate, res) {
  if (!rate) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate >= 1 && rate <= 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function talkValidation(req, res, next) {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  
  const { watchedAt, rate } = talk;

  watchDateValidation(watchedAt, res);
  rateValidation(rate, res);

  next();
}

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
};
