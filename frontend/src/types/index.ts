export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email?: string;
  data_nascimento?: string;
  tamanho_superior?: string;
  tamanho_inferior?: string;
  tamanho_calcado?: string;
  estilo_preferido?: string;
  observacoes?: string;
  data_cadastro?: string;
}

export interface Produto {
  id?: number;
  nome: string;
  categoria: string;
  tamanho: string;
  cor?: string;
  preco_venda: number;
  estoque_atual: number;
  imagem_url?: string;
  descricao?: string;
  em_destaque?: boolean;
}

export interface Venda {
  id?: number;
  cliente_id: number;
  cliente_nome?: string;
  data_venda?: string;
  valor_total: number;
  forma_pagamento: 'PIX' | 'Cartao_Credito' | 'Cartao_Debito' | 'Dinheiro';
  status: 'Concluida' | 'Pendente' | 'Cancelada';
  observacoes?: string;
}

export interface PipelineItem {
  id?: number;
  cliente_id: number;
  cliente_nome?: string;
  cliente_telefone?: string;
  etapa: 'Nova Cliente' | 'Em Atendimento' | 'Mala em Casa' | 'Aguardando Pagamento' | 'Pos-Venda' | 'Inativa';
  anotacoes?: string;
  data_ultimo_contato?: string;
  data_retorno?: string;
}

export interface DashboardMetrics {
  totalClientes: number;
  totalProdutos: number;
  totalPecasEstoque: number;
  totalVendas: number;
  faturamentoTotal: number;
  clientesPrecisaAtencao: number;
}
