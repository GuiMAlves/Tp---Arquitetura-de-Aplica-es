const express = require('express');
const marcaController = require('../controllers/marca.controller');

const router = express.Router();

/**
 * @openapi
 * /api/marcas:
 *   get:
 *     tags:
 *       - Marcas
 *     summary: Listar todas as marcas
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
router.get('/', marcaController.list);

/**
 * @openapi
 * /api/marcas/{id}:
 *   get:
 *     tags:
 *       - Marcas
 *     summary: Obter marca por ID
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
 *       404:
 *         description: Marca não encontrada
 */
router.get('/:id', marcaController.getById);

/**
 * @openapi
 * /api/marcas:
 *   post:
 *     tags:
 *       - Marcas
 *     summary: Criar uma nova marca
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
 */
router.post('/', marcaController.create);

/**
 * @openapi
 * /api/marcas/{id}:
 *   put:
 *     tags:
 *       - Marcas
 *     summary: Atualizar marca
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
 *       404:
 *         description: Marca não encontrada
 */
router.put('/:id', marcaController.update);

/**
 * @openapi
 * /api/marcas/{id}:
 *   delete:
 *     tags:
 *       - Marcas
 *     summary: Excluir marca
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
 *       404:
 *         description: Marca não encontrada
 */
router.delete('/:id', marcaController.delete);

module.exports = router;
