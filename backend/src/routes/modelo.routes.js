const express = require('express');
const modeloController = require('../controllers/modelo.controller');

const router = express.Router();

/**
 * @openapi
 * /api/modelos:
 *   get:
 *     tags:
 *       - Modelos
 *     summary: Listar todos os modelos
 *     responses:
 *       200:
 *         description: Lista de modelos
 */
router.get('/', modeloController.list);

/**
 * @openapi
 * /api/modelos/{id}:
 *   get:
 *     tags:
 *       - Modelos
 *     summary: Obter modelo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Modelo encontrado
 *       404:
 *         description: Modelo não encontrado
 */
router.get('/:id', modeloController.getById);

/**
 * @openapi
 * /api/modelos:
 *   post:
 *     tags:
 *       - Modelos
 *     summary: Criar um novo modelo
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
 */
router.post('/', modeloController.create);

/**
 * @openapi
 * /api/modelos/{id}:
 *   put:
 *     tags:
 *       - Modelos
 *     summary: Atualizar modelo
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
 *       404:
 *         description: Modelo não encontrado
 */
router.put('/:id', modeloController.update);

/**
 * @openapi
 * /api/modelos/{id}:
 *   patch:
 *     tags:
 *       - Modelos
 *     summary: Atualizar parcialmente modelo
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
 *       404:
 *         description: Modelo não encontrado
 */
router.patch('/:id', modeloController.patch);

/**
 * @openapi
 * /api/modelos/{id}:
 *   delete:
 *     tags:
 *       - Modelos
 *     summary: Excluir modelo
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
 *       404:
 *         description: Modelo não encontrado
 */
router.delete('/:id', modeloController.delete);

module.exports = router;
