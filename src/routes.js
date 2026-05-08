const express = require('express');
const router = express.Router();
const { autenticarJWT } = require('./minddlewares/autenticarJWT');

// Simulação de banco de dados em memória
const users = [];

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  users.push(user);
  res.status(201).send('User registered');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, process.env.SECRET_JWT, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).send('Credenciais inválidas.');
});

router.get('/musicas', autenticarJWT, (req, res) => {
res.json([
  { id: 1, titulo: 'Música A', artista: 'DJ A' },
  { id: 2, titulo: 'Música B', artista: 'DJ B' },
  ]);
});

module.exports = router;