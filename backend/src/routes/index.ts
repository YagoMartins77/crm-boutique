import { Router } from 'express';
import { listClients, getClientById, createClient } from '../controllers/clientController';
import { listProducts, createProduct } from '../controllers/productController';
import { listSales, getDashboardMetrics } from '../controllers/saleController';
import { listPipeline, updatePipelineStage } from '../controllers/pipelineController';
import {
  getInsights,
  triggerAnalysis,
  getMemory,
  resetMemoryController,
  getAiConfig
} from '../controllers/aiController';

const router = Router();

// Rotas de Clientes
router.get('/clients', listClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);

// Rotas de Produtos / Peças
router.get('/products', listProducts);
router.post('/products', createProduct);

// Rotas de Vendas e Dashboard
router.get('/sales', listSales);
router.get('/dashboard/metrics', getDashboardMetrics);

// Rotas de Pipeline & Pós-Venda
router.get('/pipeline', listPipeline);
router.patch('/pipeline/:id/stage', updatePipelineStage);

// Rotas de Inteligência Artificial & Aprendizado de Padrões (OpenRouter)
router.get('/ai/insights', getInsights);
router.post('/ai/analyze', triggerAnalysis);
router.get('/ai/memory', getMemory);
router.post('/ai/memory/reset', resetMemoryController);
router.get('/ai/config', getAiConfig);

export default router;

