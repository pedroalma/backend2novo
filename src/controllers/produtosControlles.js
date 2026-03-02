const { Produto } = require('../models');

exports.cadastrarProduto = async (req, res) => {
  try {
    console.log('Payload recebido:', JSON.stringify(req.body, null, 2));

    const {
      nome,                         // ← frontend envia 'nome', não 'descricao'
      unidade,
      quantidade_por_unidade,
      quantidade_de_pacotes,
      validade,
      data_recebimento
    } = req.body;

    // Validações básicas (frontend já faz algumas, mas reforçamos)
    if (!nome || !unidade || !quantidade_por_unidade || !quantidade_de_pacotes || !validade) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando (nome, unidade, quantidades, validade)" });
    }

    const unidadesValidas = ['kg', 'g', 'l', 'ml', 'un', 'cx', 'pct'];
    if (!unidadesValidas.includes(unidade.toLowerCase())) {
      return res.status(400).json({ erro: "Unidade inválida. Use kg, g, l, ml, un, cx ou pct" });
    }

    // Converte números (garante que não venha string ou NaN)
    const qtdUnidade = parseFloat(quantidade_por_unidade);
    const qtdPacotes = parseInt(quantidade_de_pacotes);

    if (isNaN(qtdUnidade) || isNaN(qtdPacotes) || qtdUnidade <= 0 || qtdPacotes <= 0) {
      return res.status(400).json({ erro: "Quantidades devem ser números positivos" });
    }

    // Cria o produto com os campos que o model espera
    const produto = await Produto.create({
      descricao: nome.trim(),  // ← frontend envia 'nome', model espera 'descricao'
      quantidade: qtdPacotes,  // ← quantidade total = pacotes
      peso: qtdUnidade,        // ← peso unitário ou total
      unidade: unidade.toLowerCase(),
      codBar: '0000000000000', // ← default se não enviar
      dataDeEntrada: data_recebimento ? new Date(data_recebimento) : new Date(),
      dataDeValidade: new Date(validade),
      dataLimiteDeSaida: null,
      codUsu: 1,               // ← default para teste (admin)
      codOri: 1,               // ← default para teste
      codList: 1               // ← default para teste
    });

    console.log('Produto criado com sucesso:', JSON.stringify(produto.toJSON(), null, 2));

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
        error: 'Valor duplicado (ex: código de barras já existe)',
        detalhes: err.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      error: 'Erro interno no servidor',
      mensagem: err.message || 'Detalhes não disponíveis'
    });
  }
};

// Mantenha os outros métodos (listarTodos, buscarPorId, atualizar, deletar)
exports.listarTodos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json({ total: produtos.length, produtos });
  } catch (error) {
    console.error('Erro ao listar:', error);
    res.status(500).json({ erro: "Erro ao listar", detalhes: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.codProd);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    console.error('Erro ao buscar:', error);
    res.status(500).json({ erro: "Erro ao buscar", detalhes: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.codProd);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    const updates = req.body;
    if (updates.unidade) {
      updates.unidade = updates.unidade.toLowerCase();
    }

    // Converte datas se enviadas como string
    if (updates.dataDeEntrada) updates.dataDeEntrada = new Date(updates.dataDeEntrada);
    if (updates.dataDeValidade) updates.dataDeValidade = new Date(updates.dataDeValidade);
    if (updates.dataLimiteDeSaida) updates.dataLimiteDeSaida = new Date(updates.dataLimiteDeSaida);

    await produto.update(updates);

    res.json({ mensagem: "Produto atualizado com sucesso", produto });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    res.status(500).json({ erro: "Erro ao atualizar", detalhes: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.codProd);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.json({ mensagem: "Produto deletado com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    res.status(500).json({ erro: "Erro ao deletar", detalhes: error.message });
  }
};