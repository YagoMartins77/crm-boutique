import { Cliente, Produto, Venda, PipelineItem } from '../types';

export const DEMO_CLIENTES: Cliente[] = [
  {
    id: 1,
    nome: 'Mariana Silva Alencar',
    telefone: '11988887777',
    email: 'mariana.alencar@email.com',
    data_nascimento: '1992-04-12',
    tamanho_superior: 'M',
    tamanho_inferior: '38',
    tamanho_calcado: '37',
    estilo_preferido: 'Casual Elegante',
    observacoes: 'Prefere tons terrosos e tecidos naturais como linho e seda. Ama o serviço de mala em casa.',
    data_cadastro: '2026-08-10 10:00:00'
  },
  {
    id: 2,
    nome: 'Beatriz Costa Prado',
    telefone: '11977776666',
    email: 'beatriz.prado@email.com',
    data_nascimento: '1990-09-28',
    tamanho_superior: 'P',
    tamanho_inferior: '36',
    tamanho_calcado: '36',
    estilo_preferido: 'Romântico Moderno',
    observacoes: 'Adora vestidos florais fluidos e decotes discretos. Sensível ao caimento dos ombros.',
    data_cadastro: '2026-08-15 14:20:00'
  },
  {
    id: 3,
    nome: 'Juliana Mendes Carvalho',
    telefone: '11966665555',
    email: 'juliana.mendes@email.com',
    data_nascimento: '1985-12-05',
    tamanho_superior: 'G',
    tamanho_inferior: '42',
    tamanho_calcado: '39',
    estilo_preferido: 'Alfaiataria Clássica',
    observacoes: 'Advogada, compra prioritariamente terninhos e camisas sociais estruturadas.',
    data_cadastro: '2026-09-01 11:15:00'
  },
  {
    id: 4,
    nome: 'Camila Rocha Fontes',
    telefone: '11955554444',
    email: 'camila.fontes@email.com',
    data_nascimento: '1996-07-19',
    tamanho_superior: 'P',
    tamanho_inferior: '36',
    tamanho_calcado: '35',
    estilo_preferido: 'Minimalista Chic',
    observacoes: 'Gosta de peças versáteis monocromáticas: preto, off-white e fendi.',
    data_cadastro: '2026-09-12 16:40:00'
  },
  {
    id: 5,
    nome: 'Helena Albuquerque',
    telefone: '11944443333',
    email: 'helena.albuquerque@email.com',
    data_nascimento: '1982-11-03',
    tamanho_superior: 'M',
    tamanho_inferior: '40',
    tamanho_calcado: '38',
    estilo_preferido: 'Elegante Contemporâneo',
    observacoes: 'Cliente VIP de compras sazonais. Solicita curadoria antes das viagens de fim de ano.',
    data_cadastro: '2026-09-25 15:30:00'
  }
];

export const DEMO_PRODUTOS: Produto[] = [
  {
    id: 1,
    nome: 'Vestido Midi Silk Champagne',
    categoria: 'Vestidos',
    tamanho: 'M',
    cor: 'Champagne',
    preco_venda: 489.90,
    estoque_atual: 6,
    imagem_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    descricao: 'Vestido confeccionado em seda acetinada de caimento impecável com fenda lateral sutil.',
    em_destaque: true
  },
  {
    id: 2,
    nome: 'Blazer Alfaiataria Areia Sartorial',
    categoria: 'Alfaiataria',
    tamanho: 'P, M, G',
    cor: 'Areia Natural',
    preco_venda: 629.00,
    estoque_atual: 4,
    imagem_url: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80',
    descricao: 'Blazer estruturado com ombreiras suaves e forro em acetato respirável.',
    em_destaque: true
  },
  {
    id: 3,
    nome: 'Calça Pantalona Crepe Fendi',
    categoria: 'Alfaiataria',
    tamanho: '38, 40, 42',
    cor: 'Fendi',
    preco_venda: 359.90,
    estoque_atual: 8,
    imagem_url: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    descricao: 'Pantalona de cintura alta com cós duplo alongado e pregas frontais refinadas.',
    em_destaque: true
  },
  {
    id: 4,
    nome: 'Camisa de Seda Pura Off-White',
    categoria: 'Blusas & Camisas',
    tamanho: 'PP, P, M',
    cor: 'Off-White',
    preco_venda: 389.00,
    estoque_atual: 10,
    imagem_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    descricao: 'Camisa clássica com botões em madrepérola natural e punho francês.',
    em_destaque: true
  },
  {
    id: 5,
    nome: 'Vestido Longo Evasê Terracota',
    categoria: 'Vestidos',
    tamanho: 'P, M',
    cor: 'Terracota',
    preco_venda: 549.90,
    estoque_atual: 5,
    imagem_url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    descricao: 'Peça fluida com decote nas costas delicado, ideal para coquetéis e ocasiões especiais.',
    em_destaque: true
  },
  {
    id: 6,
    nome: 'Cinto Couro Legítimo Fivela Banhada',
    categoria: 'Acessórios',
    tamanho: 'Único',
    cor: 'Caramelo',
    preco_venda: 179.90,
    estoque_atual: 14,
    imagem_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    descricao: 'Cinto em couro bovino nobre com fivela orgânica em banho ouro envelhecido.',
    em_destaque: false
  },
  {
    id: 7,
    nome: 'Colete Alfaiataria Linho Rústico',
    categoria: 'Alfaiataria',
    tamanho: 'P, M',
    cor: 'Linho Cru',
    preco_venda: 299.90,
    estoque_atual: 7,
    imagem_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    descricao: 'Colete contemporâneo perfeito para sobreposições ou usado como peça única.',
    em_destaque: true
  },
  {
    id: 8,
    nome: 'Saia Plissada Metalizada Bronze',
    categoria: 'Saias & Shorts',
    tamanho: 'M, G',
    cor: 'Bronze Suave',
    preco_venda: 329.00,
    estoque_atual: 3,
    imagem_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
    descricao: 'Plissado permanente com cós em elástico acetinado confortável.',
    em_destaque: false
  }
];

export const DEMO_VENDAS: Venda[] = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nome: 'Mariana Silva Alencar',
    data_venda: '2026-10-10 14:30:00',
    valor_total: 849.80,
    forma_pagamento: 'PIX',
    status: 'Concluida',
    observacoes: 'Compra na loja após mala em casa aprovada.'
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nome: 'Beatriz Costa Prado',
    data_venda: '2026-10-12 16:45:00',
    valor_total: 389.00,
    forma_pagamento: 'Cartao_Credito',
    status: 'Concluida',
    observacoes: 'Pagamento em 3x s/ juros.'
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nome: 'Juliana Mendes Carvalho',
    data_venda: '2026-10-15 11:20:00',
    valor_total: 988.90,
    forma_pagamento: 'Cartao_Credito',
    status: 'Concluida',
    observacoes: 'Blazer e pantalona para audiência.'
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nome: 'Camila Rocha Fontes',
    data_venda: '2026-10-17 18:00:00',
    valor_total: 359.90,
    forma_pagamento: 'PIX',
    status: 'Concluida',
    observacoes: 'Retirada expressa na boutique.'
  }
];

export const DEMO_PIPELINE: PipelineItem[] = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nome: 'Mariana Silva Alencar',
    cliente_telefone: '11988887777',
    etapa: 'Pos-Venda',
    anotacoes: 'Enviada mensagem sobre cuidados de lavagem da seda champagne. Feedback excelente.',
    data_ultimo_contato: '2026-10-11',
    data_retorno: '2026-10-25'
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nome: 'Beatriz Costa Prado',
    cliente_telefone: '11977776666',
    etapa: 'Em Atendimento',
    anotacoes: 'Aguardando chegar a nova coleção de linho puro tamanho P para enviar fotos.',
    data_ultimo_contato: '2026-10-16',
    data_retorno: '2026-10-22'
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nome: 'Juliana Mendes Carvalho',
    cliente_telefone: '11966665555',
    etapa: 'Mala em Casa',
    anotacoes: 'Mala com 5 opções de alfaiataria entregue na residência. Retirada agendada.',
    data_ultimo_contato: '2026-10-17',
    data_retorno: '2026-10-19'
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nome: 'Camila Rocha Fontes',
    cliente_telefone: '11955554444',
    etapa: 'Aguardando Pagamento',
    anotacoes: 'Separou vestido terracota para evento no sábado. Link de pagamento enviado.',
    data_ultimo_contato: '2026-10-18',
    data_retorno: '2026-10-19'
  },
  {
    id: 5,
    cliente_id: 5,
    cliente_nome: 'Helena Albuquerque',
    cliente_telefone: '11944443333',
    etapa: 'Inativa',
    anotacoes: 'Sem compras ou interações há mais de 75 dias. Programar contato com convite de preview VIP.',
    data_ultimo_contato: '2026-08-01',
    data_retorno: '2026-10-24'
  }
];
