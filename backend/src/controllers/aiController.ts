import { Request, Response } from 'express';
import {
  getLatestInsights,
  runAiAnalysis,
  getMemoryInfo,
  resetMemory,
  FREE_OPENROUTER_MODELS
} from '../services/aiService';

// Retorna os últimos insights gerados pela IA
export const getInsights = async (req: Request, res: Response) => {
  try {
    const insights = await getLatestInsights();
    const memoryInfo = getMemoryInfo();

    return res.json({
      success: true,
      data: insights,
      memoryStats: {
        iterationCount: memoryInfo.iterationCount,
        lineCount: memoryInfo.lineCount,
        charCount: memoryInfo.charCount,
        lastUpdated: memoryInfo.lastUpdated
      },
      hasServerKey: !!(process.env.OPENROUTER_API_KEY && !process.env.OPENROUTER_API_KEY.includes('sua_chave'))
    });
  } catch (error: any) {
    console.error('Erro ao buscar insights de IA:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Erro ao processar insights de IA'
    });
  }
};

// Executa um novo ciclo de aprendizado com o OpenRouter
export const triggerAnalysis = async (req: Request, res: Response) => {
  const { apiKey, model, customNote } = req.body;

  try {
    const summary = await runAiAnalysis({
      apiKey,
      model,
      customNote
    });

    const memoryInfo = getMemoryInfo();

    return res.json({
      success: true,
      message: 'Ciclo de aprendizado concluído e gravado no arquivo de texto com sucesso!',
      data: summary,
      memoryStats: {
        iterationCount: memoryInfo.iterationCount,
        lineCount: memoryInfo.lineCount,
        charCount: memoryInfo.charCount,
        lastUpdated: memoryInfo.lastUpdated
      }
    });
  } catch (error: any) {
    console.error('Erro ao executar ciclo de aprendizado:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Falha ao executar ciclo de aprendizado'
    });
  }
};

// Retorna o conteúdo bruto do arquivo de texto de memória acumulada
export const getMemory = async (req: Request, res: Response) => {
  try {
    const info = getMemoryInfo();
    return res.json({
      success: true,
      data: info
    });
  } catch (error: any) {
    console.error('Erro ao ler memória de IA:', error);
    return res.status(500).json({
      success: false,
      message: 'Falha ao carregar arquivo de memória'
    });
  }
};

// Reseta o arquivo de memória para o início
export const resetMemoryController = async (req: Request, res: Response) => {
  try {
    const info = resetMemory();
    return res.json({
      success: true,
      message: 'Memória cognitiva resetada com sucesso. O arquivo de texto foi reinicializado.',
      data: info
    });
  } catch (error: any) {
    console.error('Erro ao resetar memória:', error);
    return res.status(500).json({
      success: false,
      message: 'Falha ao resetar arquivo de memória'
    });
  }
};

// Retorna a lista de modelos grátis disponíveis e status da chave
export const getAiConfig = async (req: Request, res: Response) => {
  const hasServerKey = !!(process.env.OPENROUTER_API_KEY && !process.env.OPENROUTER_API_KEY.includes('sua_chave'));
  return res.json({
    success: true,
    freeModels: FREE_OPENROUTER_MODELS,
    defaultModel: process.env.OPENROUTER_MODEL || FREE_OPENROUTER_MODELS[0],
    hasServerKey
  });
};
