const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Músicas',
      version: '1.0.0',
    },
  },
  apis: ['./src/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});