import { Request, Response } from 'express';
import { pool } from '../config/db';
import { DEMO_CLIENTES } from '../data/mockData';
import { Cliente } from '../types';

export const listClients = async (req: Request, res: Response) => {
  const { search, estilo } = req.query;

  try {
    let sql = 'SELECT * FROM clientes WHERE 1=1';
    const params: any[] = [];

    if (search) {
      sql += ' AND (nome LIKE ? OR telefone LIKE ? OR email LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (estilo) {
      sql += ' AND estilo_preferido = ?';
      params.push(estilo);
    }

    sql += ' ORDER BY id DESC';

    const [rows] = await pool.query(sql, params);
    return res.json({
      success: true,
      source: 'database',
      data: rows
    });
  } catch (error) {
    console.warn('Erro ao consultar banco, retornando dados demonstrativos:', error);
    // Filtragem em memória no mockData
    let clientes = [...DEMO_CLIENTES];
    if (search) {
      const term = String(search).toLowerCase();
      clientes = clientes.filter(c =>
        c.nome.toLowerCase().includes(term) ||
        c.telefone.includes(term) ||
        (c.email && c.email.toLowerCase().includes(term))
      );
    }
    if (estilo) {
      clientes = clientes.filter(c => c.estilo_preferido === estilo);
    }

    return res.json({
      success: true,
      source: 'demonstrative_mock',
      data: clientes
    });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrada' });
    }
    return res.json({ success: true, data: rows[0] });
  } catch (error) {
    const cliente = DEMO_CLIENTES.find(c => c.id === Number(id));
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrada' });
    }
    return res.json({ success: true, source: 'demonstrative_mock', data: cliente });
  }
};

export const createClient = async (req: Request, res: Response) => {
  const {
    nome,
    telefone,
    email,
    data_nascimento,
    tamanho_superior,
    tamanho_inferior,
    tamanho_calcado,
    estilo_preferido,
    observacoes
  }: Cliente = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({
      success: false,
      message: 'Nome e telefone são obrigatórios para o cadastro da cliente.'
    });
  }

  try {
    const sql = `
      INSERT INTO clientes 
      (nome, telefone, email, data_nascimento, tamanho_superior, tamanho_inferior, tamanho_calcado, estilo_preferido, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(sql, [
      nome,
      telefone,
      email || null,
      data_nascimento || null,
      tamanho_superior || null,
      tamanho_inferior || null,
      tamanho_calcado || null,
      estilo_preferido || null,
      observacoes || null
    ]);

    // Cria também o registro inicial no pipeline
    await pool.query(
      `INSERT INTO pipeline_atendimentos (cliente_id, etapa, anotacoes, data_ultimo_contato) VALUES (?, 'Nova Cliente', 'Cadastro inicial realizado', CURDATE())`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Cliente cadastrada com sucesso!',
      data: { id: result.insertId, ...req.body }
    });
  } catch (error) {
    console.error('Erro ao inserir cliente no banco:', error);
    // Em caso de falha de conexão, simula criação em memória
    const newId = DEMO_CLIENTES.length + 1;
    const novo = { id: newId, ...req.body };
    DEMO_CLIENTES.unshift(novo);
    return res.status(201).json({
      success: true,
      source: 'demonstrative_mock',
      message: 'Cliente registrada na base demonstrativa com sucesso!',
      data: novo
    });
  }
};
