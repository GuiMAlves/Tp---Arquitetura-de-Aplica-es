const mongoose = require('mongoose');
//conectar no banco de dados
const connectDatabase = async () => {
  //acessando a variável de ambiente MONGODB_URI para obter a string de conexão do MongoDB
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI não definido em .env');
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Conectado ao MongoDB');
};

module.exports = connectDatabase;
