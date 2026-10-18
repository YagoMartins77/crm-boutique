import { Request, Response } from 'express';
import { pool } from '../config/db';
import { DEMO_PRODUTOS } from '../data/mockData';
import { Produto } from '../types';

export const listProducts = async (req: Request, res: Response) => {
  const { search, categoria } = req.query;

  try {
    let sql = 'SELECT * FROM produtos WHERE 1=1';
    const params: any[] = [];

    if (search) {
      sql += ' AND (nome LIKE ? OR descricao LIKE ? OR cor LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (categoria && categoria !== 'Todas') {
      sql += ' AND categoria = ?';
      params.push(categoria);
    }

    sql += ' ORDER BY id DESC';

    const [rows] = await pool.query(sql, params);
    return res.json({
      success: true,
      source: 'database',
      data: rows
    });
  } catch (error) {
    console.warn('Erro ao consultar produtos no banco, retornando dados demonstrativos:', error);
    let produtos = [...DEMO_PRODUTOS];
    if (search) {
      const term = String(search).toLowerCase();
      produtos = produtos.filter(p =>
        p.nome.toLowerCase().includes(term) ||
        (p.descricao && p.descricao.toLowerCase().includes(term)) ||
        (p.cor && p.cor.toLowerCase().includes(term))
      );
    }
    if (categoria && categoria !== 'Todas') {
      produtos = produtos.filter(p => p.categoria === categoria);
    }

    return res.json({
      success: true,
      source: 'demonstrative_mock',
      data: produtos
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    nome,
    categoria,
    tamanho,
    cor,
    preco_venda,
    estoque_atual,
    imagem_url,
    descricao,
    em_destaque
  }: Produto = req.body;

  if (!nome || !categoria || preco_venda === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Nome, categoria e preço de venda são campos obrigatórios.'
    });
  }

  try {
    const sql = `
      INSERT INTO produtos 
      (nome, categoria, tamanho, cor, preco_venda, estoque_atual, imagem_url, descricao, em_destaque)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(sql, [
      nome,
      categoria,
      tamanho || 'Único',
      cor || 'Padrão',
      preco_venda,
      estoque_atual || 0,
      imagem_url || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      descricao || null,
      em_destaque ? 1 : 0
    ]);

    return res.status(201).json({
      success: true,
      message: 'Peça cadastrada no catálogo com sucesso!',
      data: { id: result.insertId, ...req.body }
    });
  } catch (error) {
    console.error('Erro ao inserir produto no banco:', error);
    const newId = DEMO_PRODUTOS.length + 1;
    const novoProduto = { id: newId, ...req.body };
    DEMO_PRODUTOS.unshift(novoProduto);
    return res.status(201).json({
      success: true,
      source: 'demonstrative_mock',
      message: 'Peça adicionada ao catálogo demonstrativo com sucesso!',
      data: novoProduto
    });
  }
};
