const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { autenticarJWT } = require('./minddlewares/autenticarJWT');

// Simulação de banco de dados em memória
const users = [];

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já registrado.' });
  }
  users.push(user);
  res.status(201).json({ message: 'Usário registrado com sucesso!' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
  const token = jwt.sign({ email }, process.env.SECRET_JWT, { expiresIn: '1h' });
  res.json({ token , message: 'Logado com sucesso!' });
  
});

router.get('/musicas', autenticarJWT, (req, res) => {
  return res.json([
    { id: 1, titulo: 'Música A', artista: 'DJ A' },
    { id: 2, titulo: 'Música B', artista: 'DJ B' },
  ]);
});

module.exports = router;