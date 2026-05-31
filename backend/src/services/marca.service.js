const Marca = require('../models/marca.model');

class MarcaService {
  async list() {
    return Marca.find();
  }

  async getById(id) {
    return Marca.findById(id);
  }

  async create(data) {
    return Marca.create(data);
  }

  async update(id, data) {
    return Marca.findByIdAndUpdate(id, data, { new: true, runValidators: true, overwrite: true });
  }

  async patch(id, data) {
    return Marca.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Marca.findByIdAndDelete(id);
  }
}

module.exports = new MarcaService();
