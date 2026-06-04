const express = require('express');
const modeloController = require('../controllers/modelo.controller');

const router = express.Router();

/**
 * @swagger
 * /api/modelos:
 *   get:
 *     tags:
 *       - Modelos
 *     summary: Listar todos os modelos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de modelos
 *       401:
 *         description: Não autenticado
 */
router.get('/', modeloController.list);

/**
 * @swagger
 * /api/modelos/{id}:
 *   get:
 *     tags:
 *       - Modelos
 *     summary: Obter modelo por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Modelo encontrado
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Modelo não encontrado
 */
router.get('/:id', modeloController.getById);

/**
 * @swagger
 * /api/modelos:
 *   post:
 *     tags:
 *       - Modelos
 *     summary: Criar um novo modelo
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
 *               anoFabricacao:
 *                 type: integer
 *               anoModelo:
 *                 type: integer
 *               carroceria:
 *                 type: string
 *                 enum: ['Hatch', 'SUV', 'Pickup', 'Caminhonete', 'Esportivo']
 *               kilometragem:
 *                 type: integer
 *               combustivel:
 *                 type: string
 *                 enum: ['Gasolina', 'Álcool', 'Flex', 'Elétrico']
 *               cor:
 *                 type: string
 *               cambio:
 *                 type: string
 *                 enum: ['Automático', 'Manual']
 *               marca:
 *                 type: string
 *             required:
 *               - nome
 *               - anoFabricacao
 *               - anoModelo
 *               - carroceria
 *               - kilometragem
 *               - combustivel
 *               - cor
 *               - cambio
 *               - marca
 *     responses:
 *       201:
 *         description: Modelo criado
 *       401:
 *         description: Não autenticado
 */
router.post('/', modeloController.create);

/**
 * @swagger
 * /api/modelos/{id}:
 *   put:
 *     tags:
 *       - Modelos
 *     summary: Atualizar modelo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               anoFabricacao:
 *                 type: integer
 *               anoModelo:
 *                 type: integer
 *               carroceria:
 *                 type: string
 *                 enum: ['Hatch', 'SUV', 'Pickup', 'Caminhonete', 'Esportivo']
 *               kilometragem:
 *                 type: integer
 *               combustivel:
 *                 type: string
 *                 enum: ['Gasolina', 'Álcool', 'Flex', 'Elétrico']
 *               cor:
 *                 type: string
 *               cambio:
 *                 type: string
 *                 enum: ['Automático', 'Manual']
 *               marca:
 *                 type: string
 *             required:
 *               - nome
 *               - anoFabricacao
 *               - anoModelo
 *               - carroceria
 *               - kilometragem
 *               - combustivel
 *               - cor
 *               - cambio
 *               - marca
 *     responses:
 *       200:
 *         description: Modelo atualizado
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Modelo não encontrado
 */
router.put('/:id', modeloController.update);

/**
 * @swagger
 * /api/modelos/{id}:
 *   patch:
 *     tags:
 *       - Modelos
 *     summary: Atualizar parcialmente modelo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do modelo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               anoFabricacao:
 *                 type: integer
 *               anoModelo:
 *                 type: integer
 *               carroceria:
 *                 type: string
 *                 enum: ['Hatch', 'SUV', 'Pickup', 'Caminhonete', 'Esportivo']
 *               kilometragem:
 *                 type: integer
 *               combustivel:
 *                 type: string
 *                 enum: ['Gasolina', 'Álcool', 'Flex', 'Elétrico']
 *               cor:
 *                 type: string
 *               cambio:
 *                 type: string
 *                 enum: ['Automático', 'Manual']
 *               marca:
 *                 type: string
 *     responses:
 *       200:
 *         description: Modelo atualizado parcialmente
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Modelo não encontrado
 */
router.patch('/:id', modeloController.patch);

/**
 * @swagger
 * /api/modelos/{id}:
 *   delete:
 *     tags:
 *       - Modelos
 *     summary: Excluir modelo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do modelo
 *     responses:
 *       204:
 *         description: Modelo excluído com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Modelo não encontrado
 */
router.delete('/:id', modeloController.delete);

module.exports = router;
