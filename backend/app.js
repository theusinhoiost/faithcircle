const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const helmet = require("helmet");

const app = express();
app.use(express.json());  // Para ler JSON no body das requests
app,use(helmet());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/faithcircle', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar:', err));

// Rotas
app.use('/api', userRoutes);  // Suas rotas estarão em /api/users

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
