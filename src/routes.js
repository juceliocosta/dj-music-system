const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const { autenticarJWT } = require('./minddlewares/autenticarJWT');

// Simulação de banco de dados em memória
const users = [];

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Músicas
 *   description: Gestão de músicas
 */
//------------------------------------------------------


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário.
 *     tags: [Músicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Email já registrado
 */
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já registrado.' });
  }
  users.push(user);
  res.status(201).json({ message: 'Usário registrado com sucesso!' });
});


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Músicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
  const token = jwt.sign({ email }, process.env.SECRET_JWT, { expiresIn: '1h' });
  res.status(200).json({ token , message: 'Logado com sucesso!' });
  
});

/**
 * @swagger
 * /musicas:
 *   get:
 *     summary: Retorna uma lista de músicas (requer autenticação)
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de músicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da música
 *                   titulo:
 *                     type: string
 *                     description: Título da música
 *                   artista:
 *                     type: string
 *                     description: Artista da música
 *       403:
 *         description: Token não fornecido ou inválido
 */
router.get('/musicas', autenticarJWT, (req, res) => {
  return res.status(200).json([
    { id: 1, titulo: 'Música A', artista: 'DJ A' },
    { id: 2, titulo: 'Música B', artista: 'DJ B' },
  ]);
});

module.exports = router;