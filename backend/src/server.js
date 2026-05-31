require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/swagger`);
    });
  })
  .catch((error) => {
    console.error('Falha ao conectar ao banco:', error);
    process.exit(1);
  });
