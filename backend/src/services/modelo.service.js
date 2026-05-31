const Modelo = require('../models/modelo.model');

class ModeloService {
  async list() {
    return Modelo.find().populate('marca');
  }

  async getById(id) {
    return Modelo.findById(id).populate('marca');
  }

  async create(data) {
    return Modelo.create(data);
  }

  async update(id, data) {
    return Modelo.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('marca');
  }

  async delete(id) {
    return Modelo.findByIdAndDelete(id);
  }
}

module.exports = new ModeloService();
