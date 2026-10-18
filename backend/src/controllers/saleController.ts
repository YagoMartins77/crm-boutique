import { Request, Response } from 'express';
import { pool } from '../config/db';
import { DEMO_VENDAS } from '../data/mockData';

export const listSales = async (req: Request, res: Response) => {
  try {
    const sql = `
      SELECT v.*, c.nome AS cliente_nome 
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      ORDER BY v.data_venda DESC
    `;
    const [rows] = await pool.query(sql);
    return res.json({
      success: true,
      source: 'database',
      data: rows
    });
  } catch (error) {
    console.warn('Erro ao consultar vendas no banco, retornando dados demonstrativos:', error);
    return res.json({
      success: true,
      source: 'demonstrative_mock',
      data: DEMO_VENDAS
    });
  }
};

export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const [[clientesRes]]: any = await pool.query('SELECT COUNT(*) AS totalClientes FROM clientes');
    const [[produtosRes]]: any = await pool.query('SELECT COUNT(*) AS totalProdutos, SUM(estoque_atual) as totalPecas FROM produtos');
    const [[vendasRes]]: any = await pool.query('SELECT COUNT(*) AS totalVendas, COALESCE(SUM(valor_total), 0) AS faturamento FROM vendas');
    const [[atencaoRes]]: any = await pool.query(
      "SELECT COUNT(*) AS precisaAtencao FROM pipeline_atendimentos WHERE etapa IN ('Mala em Casa', 'Aguardando Pagamento', 'Inativa')"
    );

    return res.json({
      success: true,
      source: 'database',
      data: {
        totalClientes: clientesRes.totalClientes,
        totalProdutos: produtosRes.totalProdutos,
        totalPecasEstoque: produtosRes.totalPecas || 0,
        totalVendas: vendasRes.totalVendas,
        faturamentoTotal: Number(vendasRes.faturamento),
        clientesPrecisaAtencao: atencaoRes.precisaAtencao
      }
    });
  } catch (error) {
    console.warn('Erro nas métricas do banco, calculando a partir de dados demonstrativos:', error);
    return res.json({
      success: true,
      source: 'demonstrative_mock',
      data: {
        totalClientes: 5,
        totalProdutos: 8,
        totalPecasEstoque: 57,
        totalVendas: 4,
        faturamentoTotal: 2587.60,
        clientesPrecisaAtencao: 3
      }
    });
  }
};
