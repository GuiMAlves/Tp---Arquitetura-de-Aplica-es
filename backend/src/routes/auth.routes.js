const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const router = express.Router();

const gerarToken = (usuarioId) => {
  return jwt.sign(
    { usuarioId },
    process.env.JWT_SECRET || 'seu_secret_aqui',
    { expiresIn: '24h' }
  );
};

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { email, senha, nome } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const usuario = new Usuario({ email, senha, nome });
    await usuario.save();

    const token = gerarToken(usuario._id);

    res.status(201).json({
      usuario: usuario.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao registrar' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const token = gerarToken(usuario._id);

    res.json({
      usuario: usuario.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao fazer login' });
  }
});

module.exports = router;
