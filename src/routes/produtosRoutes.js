const express = require('express');
const router = express.Router();

// Importe o controller (ajuste o nome do arquivo se necessário)
const produtosController = require('../controllers/produtosControlles');

// Importe o model Produto (obrigatório para a rota GET /)
const { Produto } = require('../models');

// Rota POST para cadastrar produto (já funciona)
router.post('/', produtosController.cadastrarProduto);

// Rota GET de teste (para confirmar que o backend está vivo)
router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota GET teste funcionando! Backend OK' });
});

// Rota GET para listar TODOS os produtos cadastrados
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    if (produtos.length === 0) {
      return res.json({ mensagem: 'Nenhum produto cadastrado ainda', produtos: [] });
    }
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ erro: 'Erro ao listar produtos', mensagem: error.message });
  }
});

module.exports = router;