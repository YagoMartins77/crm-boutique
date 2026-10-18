import { Request, Response } from 'express';
import { pool } from '../config/db';
import { DEMO_PIPELINE } from '../data/mockData';

export const listPipeline = async (req: Request, res: Response) => {
  try {
    const sql = `
      SELECT p.*, c.nome AS cliente_nome, c.telefone AS cliente_telefone
      FROM pipeline_atendimentos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.data_atualizacao DESC
    `;
    const [rows] = await pool.query(sql);
    return res.json({
      success: true,
      source: 'database',
      data: rows
    });
  } catch (error) {
    console.warn('Erro ao consultar pipeline no banco, retornando dados demonstrativos:', error);
    return res.json({
      success: true,
      source: 'demonstrative_mock',
      data: DEMO_PIPELINE
    });
  }
};

export const updatePipelineStage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { etapa, anotacoes } = req.body;

  try {
    await pool.query(
      `UPDATE pipeline_atendimentos SET etapa = ?, anotacoes = COALESCE(?, anotacoes), data_ultimo_contato = CURDATE() WHERE id = ?`,
      [etapa, anotacoes || null, id]
    );

    return res.json({
      success: true,
      message: 'Etapa do pipeline atualizada com sucesso!'
    });
  } catch (error) {
    console.warn('Simulando atualização de etapa no mock demonstrativo:', error);
    const item = DEMO_PIPELINE.find(p => p.id === Number(id));
    if (item) {
      item.etapa = etapa;
      if (anotacoes) item.anotacoes = anotacoes;
    }
    return res.json({
      success: true,
      source: 'demonstrative_mock',
      message: 'Etapa atualizada na base demonstrativa!'
    });
  }
};
