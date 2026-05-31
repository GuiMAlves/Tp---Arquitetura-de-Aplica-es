const marcaService = require('../services/marca.service');

class MarcaController {
  async list(req, res, next) {
    try {
      const marcas = await marcaService.list();
      res.json(marcas);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const marca = await marcaService.getById(req.params.id);
      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }
      res.json(marca);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const marca = await marcaService.create(req.body);
      res.status(201).json(marca);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const marca = await marcaService.update(req.params.id, req.body);
      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }
      res.json(marca);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const marca = await marcaService.delete(req.params.id);
      if (!marca) {
        return res.status(404).json({ error: 'Marca não encontrada' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MarcaController();
