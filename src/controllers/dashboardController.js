const { Produto } = require('../models');

exports.obterDashboard = async (req, res) => {
  try {
    // Busca TODOS os produtos da tabela tbprodutos
    const produtos = await Produto.findAll({
      attributes: [
        'descricao',               // ou 'nome' se preferir
        'quantidade_por_unidade',
        'quantidade_de_pacotes',
        'dataDeEntrada',
        'dataDeValidade',
        'peso',
        'unidade',
        'codBar',
        'createdAt',
        'updatedAt'
      ]
    });

    const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    // Inicializa array de 12 meses
    const doacoesMensais = Array(12).fill(0);

    // Mapa para produtos mais doados
    const mapaProdutos = {};

    let totalUnidades = 0;

    produtos.forEach(produto => {
      // Calcula quantidade total do produto
      const qtdTotal = produto.quantidade_por_unidade * produto.quantidade_de_pacotes;
      totalUnidades += qtdTotal;

      // Usa dataDeEntrada para agrupar por mês
      const dataStr = produto.dataDeEntrada;
      if (dataStr) {
        const data = new Date(dataStr);
        if (!isNaN(data.getTime())) {
          const mes = data.getMonth();
          doacoesMensais[mes] += qtdTotal;
        }
      }

      // Agrupa por descrição (ou nome, se tiver)
      const nome = produto.descricao || produto.nome || 'Sem nome';
      mapaProdutos[nome] = (mapaProdutos[nome] || 0) + qtdTotal;
    });

    // Produtos mais doados (top 6)
    const maisDoados = Object.entries(mapaProdutos)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // Cestas (lógica exemplo – ajuste conforme sua regra real)
    const cestas = {
      montadas: Math.floor(totalUnidades / 20),   // ex: 20 unidades = 1 cesta
      meta: 100,                                  // pode vir de config ou outra tabela depois
      totalUnidadesDisponiveis: totalUnidades
    };

    // Retorna só os 6 primeiros meses (compatível com seu frontend)
    const meses = nomesMeses.slice(0, 6);
    const doacoesMensais6Meses = doacoesMensais.slice(0, 6);

    return res.json({
      doacoesMensais: doacoesMensais6Meses,
      meses,
      maisDoados,
      localDoacoes: [], // futuro: quando adicionar campo 'local'
      cestas
    });
  } catch (err) {
    console.error('Erro ao gerar dashboard:', err.message, err.stack);
    return res.status(500).json({ 
      error: 'Erro ao carregar dashboard',
      message: err.message 
    });
  }
};