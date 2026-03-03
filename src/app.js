const express = require('express');
const cors = require('cors');
const app = express();

const { sequelize } = require('./models');

// Middlewares
app.use(cors({ origin: '*' })); // permite tudo em dev (pode restringir depois)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de produtos (use apenas UMA vez!)
const produtosRoutes = require('./routes/produtosRoutes');
app.use('/api/produtos', produtosRoutes);

// Rota GET direta para /api/produtos (listagem simples, caso queira fallback ou teste)
app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await sequelize.models.Produto.findAll(); // usa model diretamente
    res.json({
      total: produtos.length,
      produtos: produtos.map(p => p.toJSON())
    });
  } catch (error) {
    console.error('Erro ao listar produtos diretamente:', error);
    res.status(500).json({ error: 'Erro ao listar produtos', message: error.message });
  }
});

// Rota de saúde / teste
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'API rodando normalmente',
    timestamp: new Date().toISOString()
  });
});

// 404 global (boa prática)
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL realizada com sucesso!');

    await sequelize.sync({ force: false, alter: false });
    console.log('✔ Banco sincronizado (sem alterações forçadas)');

    console.log(`✔ Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse do celular usando: http://192.168.0.101:${PORT}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor ou sincronizar banco:', error);
    process.exit(1);
  }
});