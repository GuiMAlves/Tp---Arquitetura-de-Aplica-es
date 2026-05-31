const mongoose = require('mongoose');

const modeloSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  anoFabricacao: { type: Number, required: true },
  anoModelo: { type: Number, required: true },
  carroceria: { type: String, required: true, enum: ['Hatch', 'SUV', 'Pickup', 'Caminhonete', 'Esportivo'] },
  kilometragem: { type: Number, required: true, min: 0 },
  combustivel: { type: String, required: true, enum: ['Gasolina', 'Álcool', 'Flex', 'Elétrico'] },
  cor: { type: String, required: true, trim: true },
  cambio: { type: String, required: true, enum: ['Automático', 'Manual'] },
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Modelo', modeloSchema);
