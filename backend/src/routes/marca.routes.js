const express = require('express');
const marcaController = require('../controllers/marca.controller');

const router = express.Router();

/**
 * @swagger
 * /api/marcas:
 *   get:
 *     tags:
 *       - Marcas
 *     summary: Listar todas as marcas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de marcas
 *       401:
 *         description: Não autenticado
 */
router.get('/', marcaController.list);

/**
 * @swagger
 * /api/marcas/{id}:
 *   get:
 *     tags:
 *       - Marcas
 *     summary: Obter marca por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Marca não encontrada
 */
router.get('/:id', marcaController.getById);

/**
 * @swagger
 * /api/marcas:
 *   post:
 *     tags:
 *       - Marcas
 *     summary: Criar uma nova marca
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               logo:
 *                 type: string
 *             required:
 *               - nome
 *               - logo
 *     responses:
 *       201:
 *         description: Marca criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.post('/', marcaController.create);

/**
 * @swagger
 * /api/marcas/{id}:
 *   put:
 *     tags:
 *       - Marcas
 *     summary: Atualizar marca
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               logo:
 *                 type: string
 *             required:
 *               - nome
 *               - logo
 *     responses:
 *       200:
 *         description: Marca atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Marca não encontrada
 */
router.put('/:id', marcaController.update);

/**
 * @swagger
 * /api/marcas/{id}:
 *   patch:
 *     tags:
 *       - Marcas
 *     summary: Atualizar parcialmente marca
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca atualizada parcialmente
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Marca não encontrada
 */
router.patch('/:id', marcaController.patch);

/**
 * @swagger
 * /api/marcas/{id}:
 *   delete:
 *     tags:
 *       - Marcas
 *     summary: Excluir marca
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       204:
 *         description: Marca excluída com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Marca não encontrada
 */
router.delete('/:id', marcaController.delete);

module.exports = router;
