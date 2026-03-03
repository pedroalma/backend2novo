// src/data/dashboardData.js

let produtos = [];

try {
  produtos = require('./produtos') || [];
} catch (e) {
  console.log("Arquivo produtos.js não encontrado → usando array vazio");
  produtos = [];
}

// ===============================
// 📊 DOAÇÕES MENSAIS
// ===============================
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
               'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const doacoesMensais = Array(12).fill(0);

produtos.forEach(produto => {
  if (produto.createdAt) {
    const data = new Date(produto.createdAt);
    const mes = data.getMonth(); // 0 a 11

    const totalQuantidade =
      produto.quantidadePorUnidade * produto.quantidadeDePacotes;

    doacoesMensais[mes] += totalQuantidade;
  }
});

// ===============================
// 🥧 PRODUTOS MAIS DOADOS
// ===============================
const mapaProdutos = {};

produtos.forEach(produto => {
  const nome = produto.nomeProduto;
  const total =
    produto.quantidadePorUnidade * produto.quantidadeDePacotes;

  if (!mapaProdutos[nome]) {
    mapaProdutos[nome] = 0;
  }

  mapaProdutos[nome] += total;
});

const maisDoados = Object.keys(mapaProdutos).map(nome => ({
  name: nome,
  value: mapaProdutos[nome]
}));


const localDoacoes = []; // você pode implementar quando tiver campo "local"


const totalGeral = produtos.reduce((acc, produto) => {
  return acc + (produto.quantidadePorUnidade * produto.quantidadeDePacotes);
}, 0);

// exemplo: cada cesta usa 20 unidades
const cestas = {
  totalDisponivel: Math.floor(totalGeral / 20),
  itensEmEstoque: totalGeral
};

const dashboardData = {
  doacoesMensais,
  meses,
  maisDoados,
  localDoacoes,
  cestas
};

module.exports = dashboardData;