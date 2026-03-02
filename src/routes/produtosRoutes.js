const express = require('express');
const router = express.Router();

// Importe o controller (confira o nome do arquivo!)
const produtosController = require('../controllers/produtosControlles'); // se for produtosController.js (singular), mude para '../controllers/produtosController'

// Rota POST para cadastrar produto
router.post('/', produtosController.cadastrarProduto); // ← usa 'cadastrarProduto' porque é o nome no seu controller

// Rota de teste GET (para confirmar que o arquivo carrega)
router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota GET funcionando! Backend OK' });
});

module.exports = router;