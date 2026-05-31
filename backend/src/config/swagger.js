const swaggerJSDoc = require('swagger-jsdoc');
//usar o backend sem o front end se usa essa ferramenta de comunicacao do ser humano para o backend - o swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Concessionária API',
      version: '1.0.0',
      description: 'API REST para gerenciar marcas e modelos de carros de uma concessionária.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
