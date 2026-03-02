const { Produto } = require('../models');

exports.cadastrarProduto = async (req, res) => {
  try {
    console.log('Payload recebido:', JSON.stringify(req.body, null, 2));

    // Use os nomes que o frontend envia (depois do ajuste anterior)
    const {
      descricao,                    // frontend envia 'descricao' agora
      quantidade,                   // quantidade = pacotes
      peso,                         // peso = quantidade_por_unidade
      unidade,
      codBar,
      dataDeEntrada,
      dataDeValidade,
      dataLimiteDeSaida
    } = req.body;

    // Validações
    if (!descricao || !quantidade || !peso || !unidade) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando (descricao, quantidade, peso, unidade)" });
    }

    const unidadesValidas = ['kg', 'g', 'l', 'ml', 'un', 'cx', 'pct'];
    if (!unidadesValidas.includes(unidade.toLowerCase())) {
      return res.status(400).json({ erro: "Unidade inválida" });
    }

    // Cria o produto
    const produto = await Produto.create({
  nome: req.body.nome || req.body.descricao || null,
  descricao: req.body.descricao || req.body.nome || null,
  unidade: req.body.unidade || "kg",
  quantidade_por_unidade: req.body.quantidade_por_unidade || req.body.peso || 0,
  quantidade_de_pacotes: req.body.quantidade_de_pacotes || req.body.quantidade || 1,
  validade: req.body.validade || req.body.dataDeValidade || null,
  data_recebimento: req.body.data_recebimento || req.body.dataDeEntrada || new Date().toISOString().split("T")[0],
  peso: req.body.peso || req.body.quantidade_por_unidade || 0,
  quantidade: req.body.quantidade || req.body.quantidade_de_pacotes || 1,
  codBar: req.body.codBar || '0000000000000',
  dataDeEntrada: req.body.dataDeEntrada || new Date(),
  dataDeValidade: req.body.dataDeValidade || req.body.validade || null,
  dataLimiteDeSaida: req.body.dataLimiteDeSaida || null,
  codUsu: req.body.codUsu || 1,
  codOri: req.body.codOri || 1,
  codList: req.body.codList || 1
});

    console.log('Produto criado:', JSON.stringify(produto.toJSON(), null, 2));

    return res.status(201).json(produto);
  } catch (err) {
    console.error('ERRO AO CADASTRAR PRODUTO:');
    console.error('Nome do erro:', err.name);
    console.error('Mensagem:', err.message);
    console.error('Stack:', err.stack);

    if (err.errors) {
      console.error('Erros de validação detalhados:');
      err.errors.forEach(e => {
        console.error(` - Campo: ${e.path}`);
        console.error(`   Mensagem: ${e.message}`);
        console.error(`   Valor recebido: ${e.value}`);
      });
    }

    if (err.parent) {
      console.error('Erro SQL:', err.parent.sqlMessage || err.parent.message);
    }

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Dados inválidos',
        detalhes: err.errors.map(e => ({
          campo: e.path,
          mensagem: e.message,
          valor: e.value
        }))
      });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Valor duplicado',
        detalhes: err.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      error: 'Erro interno no servidor',
      mensagem: err.message || 'Detalhes não disponíveis'
    });
  }
};