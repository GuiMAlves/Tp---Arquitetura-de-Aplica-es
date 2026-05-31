const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  logo: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Marca', marcaSchema);
