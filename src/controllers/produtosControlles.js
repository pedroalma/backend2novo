const { Produto, Lista } = require('../models');

// Função auxiliar para gerar código de barras único (EAN-13 simples)
function gerarCodBarUnico() {
  let cod = '';
  for (let i = 0; i < 12; i++) {
    cod += Math.floor(Math.random() * 10).toString();
  }
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += (i % 2 === 0 ? 1 : 3) * parseInt(cod[i]);
  }
  const verificador = (10 - (soma % 10)) % 10;
  return cod + verificador;
}

exports.cadastrarProduto = async (req, res) => {
  try {
    const payload = req.body;
    console.log('Payload recebido:', JSON.stringify(payload, null, 2));

    // 1. Validação da lista
    if (!payload.codList) {
      return res.status(400).json({ error: 'codList é obrigatório' });
    }

    const lista = await Lista.findByPk(payload.codList);
    if (!lista) {
      return res.status(400).json({
        success: false,
        message: `Lista com código ${payload.codList} não encontrada`
      });
    }

    // 2. Validações básicas
    const { nome, descricao, unidade, peso, quantidade } = payload;

    if (!descricao && !nome) {
      return res.status(400).json({ erro: "Envie 'nome' ou 'descricao'" });
    }
    if (!peso || !quantidade || !unidade) {
      return res.status(400).json({ erro: "peso, quantidade e unidade são obrigatórios" });
    }

    const unidadesValidas = ['kg', 'g', 'l', 'ml', 'un', 'cx', 'pct'];
    if (!unidadesValidas.includes(unidade.toLowerCase())) {
      return res.status(400).json({ erro: 'Unidade inválida' });
    }

    // 3. Geração automática de codBar
    let codBar = payload.codBar;

    if (!codBar || codBar === '0000000000000' || codBar.trim() === '') {
      codBar = gerarCodBarUnico();

      let tentativas = 0;
      while (tentativas < 10) {
        const existe = await Produto.findOne({ where: { codBar } });
        if (!existe) break;
        codBar = gerarCodBarUnico();
        tentativas++;
      }

      if (tentativas >= 10) {
        return res.status(500).json({
          error: true,
          message: 'Não foi possível gerar um código de barras único'
        });
      }

      console.log(`CodBar gerado automaticamente: ${codBar}`);
    }

    // 4. Dados finais para o create
    const dadosProduto = {
      nome: nome || descricao || 'Sem nome',
      descricao: descricao || nome || null,
      unidade: unidade,
      quantidade_por_unidade: payload.quantidade_por_unidade || peso || 0,
      quantidade_de_pacotes: payload.quantidade_de_pacotes || quantidade || 1,
      validade: payload.validade || payload.dataDeValidade || null,
      data_recebimento: payload.data_recebimento || payload.dataDeEntrada || new Date().toISOString().split('T')[0],
      peso: peso || 0,
      quantidade: quantidade || 1,
      codBar: codBar,
      dataDeEntrada: payload.dataDeEntrada ? new Date(payload.dataDeEntrada) : new Date(),
      dataDeValidade: payload.dataDeValidade ? new Date(payload.dataDeValidade) : null,
      dataLimiteDeSaida: payload.dataLimiteDeSaida || null,
      codUsu: payload.codUsu || 1,
      codOri: payload.codOri || 1,
      codList: payload.codList
    };

    // 5. Criação
    const produto = await Produto.create(dadosProduto);

    console.log('Produto criado:', JSON.stringify(produto.toJSON(), null, 2));

    return res.status(201).json({
      success: true,
      produto: produto.toJSON()
    });

  } catch (err) {
    console.error('ERRO AO CADASTRAR PRODUTO:', err.name, err.message, err.stack?.substring(0, 500));

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Conflito',
        message: 'Já existe um produto com esse código de barras ou outro campo único',
        detalhes: err.errors?.map(e => e.message)
      });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        error: 'Chave estrangeira inválida',
        message: err.parent?.sqlMessage || err.message
      });
    }

    return res.status(500).json({
      error: 'Erro interno',
      message: err.message || 'Detalhes não disponíveis'
    });
  }
};
exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    console.log(`[PUT] Tentativa de atualizar produto ID: ${id}`);
    console.log(`[PUT] Dados recebidos:`, JSON.stringify(dados, null, 2));

    const produto = await Produto.findByPk(id);
    if (!produto) {
      console.log(`[PUT] Produto ${id} não encontrado`);
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.update(dados);
    console.log(`[PUT] Produto ${id} atualizado com sucesso`);

    return res.status(200).json({
      success: true,
      produto: produto.toJSON()
    });
  } catch (err) {
    console.error('[PUT] Erro ao atualizar produto:', err.message, err.stack?.substring(0, 500));
    return res.status(500).json({
      error: 'Erro interno ao atualizar',
      message: err.message
    });
  }
};
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json({
      total: produtos.length,
      produtos: produtos.map(p => p.toJSON())
    });
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    return res.status(500).json({ error: 'Erro ao listar' });
  }
};