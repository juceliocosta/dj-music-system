const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({error: "Token não fornecido."});
  }
  try {
    const dados = jwt.verify(token, process.env.SECRET_JWT);
    req.user = dados;
    next();
  } catch {
    return res.status(403).json({error: "Token inválido."});
  }
};

module.exports = { autenticarJWT };