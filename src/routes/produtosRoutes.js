const express = require('express');
const router = express.Router();

// Importa o controller (verifique se o nome/caminho está correto)
const produtosController = require('../controllers/produtosControlles');

// Rotas
router.post('/', produtosController.cadastrarProduto);          // cadastro
router.get('/', produtosController.listarProdutos);             // listagem (obrigatória para o frontend)
router.put('/:id', produtosController.atualizarProduto);        // atualização

// Rota de teste simples (opcional, para confirmar que o router está carregado)
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Rotas de produtos ativas' });
});

module.exports = router;