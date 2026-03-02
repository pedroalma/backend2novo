const express = require('express');
const app = express();

const { sequelize } = require('./models');

// Middlewares obrigatórios para ler JSON no body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// Monta as rotas de produtos
// Use o caminho correto conforme sua estrutura de pastas
// =============================================
const produtosRoutes = require('./routes/produtosRoutes'); // ajuste se necessário: './routes/produtosRoutes'
app.use('/api/produtos', produtosRoutes);                    // ← ESSA É A LINHA QUE FALTAVA!

// Rota de saúde / teste (muito útil para debug)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'API rodando normalmente',
    timestamp: new Date().toISOString()
  });
});

// Inicia o servidor + sincroniza o banco
app.listen(3000, '192.168.0.101', async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✔ Banco sincronizado');
    console.log('✔ Servidor rodando em http://192.168.0.101:3000 (acessível na rede local)');
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
});