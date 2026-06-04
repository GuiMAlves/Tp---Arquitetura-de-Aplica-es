const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const autenticar = require('./middleware/autenticar');
const authRoutes = require('./routes/auth.routes');
const marcaRoutes = require('./routes/marca.routes');
const modeloRoutes = require('./routes/modelo.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas
app.use('/api/marcas', autenticar, marcaRoutes);
app.use('/api/modelos', autenticar, modeloRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

module.exports = app;
