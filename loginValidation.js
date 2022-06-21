function emailValidation(req, res, next) {
  const { email } = req.body;
  // site onde verifiquei o regex para validação do email https://regexr.com/
  const validation = /\b[\w\\.-]+@[\w\\.-]+\.\w{2,4}\b/;

  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (validation.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function passwordValidation(req, res, next) {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().lenghth < 6) {
    return res.status(400)
      .json({ message: 'O  "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = {
  emailValidation,
  passwordValidation,
};
