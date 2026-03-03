const express = require('express');
const app = express();

const { sequelize } = require('./models');

// Middlewares obrigatórios para ler JSON no body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/produtos', require('./routes/produtosRoutes'));
// Monta as rotas de produtos
const produtosRoutes = require('./routes/produtosRoutes');
app.use('/api/produtos', produtosRoutes);

// Rota de saúde / teste (muito útil para debug)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'API rodando normalmente',
    timestamp: new Date().toISOString()
  });
});

// Inicia o servidor e sincroniza o banco (sem force/alter para evitar conflitos)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate(); // testa a conexão
    console.log('Conexão com MySQL realizada com sucesso!');

    // Sync simples (só cria se não existir, não altera nem força)
    await sequelize.sync({ force: false, alter: false });
    console.log('✔ Banco sincronizado (sem alterações forçadas)');

    console.log(`✔ Servidor rodando em http://localhost:${PORT} (e também em http://192.168.0.101:${PORT})`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor ou sincronizar banco:', error);
    process.exit(1); // para o servidor se der erro grave
  }
});