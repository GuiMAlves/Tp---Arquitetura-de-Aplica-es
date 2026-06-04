const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  senha: { 
    type: String, 
    required: true, 
    minlength: 6
  },
  nome: { 
    type: String, 
    required: true,
    trim: true
  }
}, { timestamps: true });

// Hash da senha antes de salvar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.senha = await bcryptjs.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
usuarioSchema.methods.compararSenha = async function(senhaFornecida) {
  return await bcryptjs.compare(senhaFornecida, this.senha);
};

// Remover a senha ao serializar
usuarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
