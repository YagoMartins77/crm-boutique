import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { testConnection } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: '*', // Permite chamadas do frontend Vite localmente
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json());

// Rota de Healthcheck e status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Boutique CRM API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rotas principais
app.use('/api', routes);

// Tratamento de rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada na API' });
});

// Inicialização do servidor
app.listen(PORT, async () => {
  console.log(`✨ Servidor da Boutique CRM rodando na porta ${PORT} (http://localhost:${PORT})`);
  await testConnection();
});
