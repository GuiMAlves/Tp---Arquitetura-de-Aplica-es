const modeloService = require('../services/modelo.service');

class ModeloController {
  async list(req, res, next) {
    try {
      const modelos = await modeloService.list();
      res.json(modelos);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const modelo = await modeloService.getById(req.params.id);
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo não encontrado' });
      }
      res.json(modelo);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const modelo = await modeloService.create(req.body);
      res.status(201).json(modelo);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const modelo = await modeloService.update(req.params.id, req.body);
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo não encontrado' });
      }
      res.json(modelo);
    } catch (err) {
      next(err);
    }
  }

  async patch(req, res, next) {
    try {
      const modelo = await modeloService.patch(req.params.id, req.body);
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo não encontrado' });
      }
      res.json(modelo);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const modelo = await modeloService.delete(req.params.id);
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo não encontrado' });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ModeloController();
