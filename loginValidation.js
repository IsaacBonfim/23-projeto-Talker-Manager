function emailValidation(req, res) {
  const { email } = req.body;
  // site onde verifiquei o regex para validação do email https://regexr.com/
  const validation = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (validation.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

module.exports = {
  emailValidation,
};
