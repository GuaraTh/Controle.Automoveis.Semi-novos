const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança e otimização
app.use(helmet()); // Segurança
app.use(compression()); // Compressão de respostas
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limite de payload

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
app.use('/api/', limiter);

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d' // Cache de 1 dia para arquivos estáticos
}));

const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
  console.log(`Servidor rodando na porta ${PORT}`);
});