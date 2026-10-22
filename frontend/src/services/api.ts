import {
  Cliente,
  Produto,
  Venda,
  PipelineItem,
  DashboardMetrics,
  AiInsightSummary,
  AiMemoryInfo,
  AiConfigInfo
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';


// Dados demonstrativos elegantes locais para fallback transparente
export const LOCAL_DEMO_CLIENTES: Cliente[] = [
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
    data_cadastro: '2026-08-10'
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
    data_cadastro: '2026-08-15'
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
    data_cadastro: '2026-09-01'
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
    data_cadastro: '2026-09-12'
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
    data_cadastro: '2026-09-25'
  }
];

export const LOCAL_DEMO_PRODUTOS: Produto[] = [
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

export const LOCAL_DEMO_VENDAS: Venda[] = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nome: 'Mariana Silva Alencar',
    data_venda: '2026-10-10 14:30:00',
    valor_total: 849.80,
    forma_pagamento: 'PIX',
    status: 'Concluida',
    observacoes: 'Mala em casa aprovada integralmente'
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nome: 'Beatriz Costa Prado',
    data_venda: '2026-10-12 16:45:00',
    valor_total: 389.00,
    forma_pagamento: 'Cartao_Credito',
    status: 'Concluida',
    observacoes: 'Camisa de Seda em 3x s/ juros'
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nome: 'Juliana Mendes Carvalho',
    data_venda: '2026-10-15 11:20:00',
    valor_total: 988.90,
    forma_pagamento: 'Cartao_Credito',
    status: 'Concluida',
    observacoes: 'Conjunto Alfaiataria completo'
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nome: 'Camila Rocha Fontes',
    data_venda: '2026-10-17 18:00:00',
    valor_total: 359.90,
    forma_pagamento: 'PIX',
    status: 'Concluida',
    observacoes: 'Pantalona Fendi retirada expressa'
  }
];

export const LOCAL_DEMO_PIPELINE: PipelineItem[] = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nome: 'Mariana Silva Alencar',
    cliente_telefone: '11988887777',
    etapa: 'Pos-Venda',
    anotacoes: 'Orientada sobre os cuidados de lavagem da seda champagne. Feedback excelente!',
    data_ultimo_contato: '2026-10-11',
    data_retorno: '2026-10-25'
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nome: 'Beatriz Costa Prado',
    cliente_telefone: '11977776666',
    etapa: 'Em Atendimento',
    anotacoes: 'Aguardando preview da nova coleção de linho tamanho P.',
    data_ultimo_contato: '2026-10-16',
    data_retorno: '2026-10-22'
  },
  {
    id: 3,
    cliente_id: 3,
    cliente_nome: 'Juliana Mendes Carvalho',
    cliente_telefone: '11966665555',
    etapa: 'Mala em Casa',
    anotacoes: 'Mala com 5 opções de alfaiataria entregue. Retirada marcada.',
    data_ultimo_contato: '2026-10-17',
    data_retorno: '2026-10-19'
  },
  {
    id: 4,
    cliente_id: 4,
    cliente_nome: 'Camila Rocha Fontes',
    cliente_telefone: '11955554444',
    etapa: 'Aguardando Pagamento',
    anotacoes: 'Separou vestido terracota. Link de pagamento enviado via WhatsApp.',
    data_ultimo_contato: '2026-10-18',
    data_retorno: '2026-10-19'
  },
  {
    id: 5,
    cliente_id: 5,
    cliente_nome: 'Helena Albuquerque',
    cliente_telefone: '11944443333',
    etapa: 'Inativa',
    anotacoes: 'Sem contato há mais de 75 dias. Convidar para o preview VIP de primavera.',
    data_ultimo_contato: '2026-08-01',
    data_retorno: '2026-10-24'
  }
];

export const api = {
  // Clientes
  async getClients(search?: string, estilo?: string): Promise<{ data: Cliente[]; isDemo: boolean }> {
    try {
      const url = new URL(`${API_BASE_URL}/clients`);
      if (search) url.searchParams.append('search', search);
      if (estilo) url.searchParams.append('estilo', estilo);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Falha na resposta da API');
      const json = await res.json();
      return { data: json.data, isDemo: json.source === 'demonstrative_mock' };
    } catch (e) {
      console.warn('API offline, usando fallback local demonstrativo:', e);
      let clientes = [...LOCAL_DEMO_CLIENTES];
      if (search) {
        const term = search.toLowerCase();
        clientes = clientes.filter(c => c.nome.toLowerCase().includes(term) || c.telefone.includes(term));
      }
      if (estilo) {
        clientes = clientes.filter(c => c.estilo_preferido === estilo);
      }
      return { data: clientes, isDemo: true };
    }
  },

  async createClient(cliente: Cliente): Promise<Cliente> {
    try {
      const res = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      const json = await res.json();
      return json.data;
    } catch (e) {
      const novo = { id: Date.now(), ...cliente };
      LOCAL_DEMO_CLIENTES.unshift(novo);
      return novo;
    }
  },

  // Produtos
  async getProducts(search?: string, categoria?: string): Promise<{ data: Produto[]; isDemo: boolean }> {
    try {
      const url = new URL(`${API_BASE_URL}/products`);
      if (search) url.searchParams.append('search', search);
      if (categoria) url.searchParams.append('categoria', categoria);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Falha na resposta da API');
      const json = await res.json();
      return { data: json.data, isDemo: json.source === 'demonstrative_mock' };
    } catch (e) {
      let produtos = [...LOCAL_DEMO_PRODUTOS];
      if (search) {
        const term = search.toLowerCase();
        produtos = produtos.filter(p => p.nome.toLowerCase().includes(term) || p.categoria.toLowerCase().includes(term));
      }
      if (categoria && categoria !== 'Todas') {
        produtos = produtos.filter(p => p.categoria === categoria);
      }
      return { data: produtos, isDemo: true };
    }
  },

  async createProduct(produto: Produto): Promise<Produto> {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
      const json = await res.json();
      return json.data;
    } catch (e) {
      const novo = { id: Date.now(), ...produto };
      LOCAL_DEMO_PRODUTOS.unshift(novo);
      return novo;
    }
  },

  // Vendas
  async getSales(): Promise<{ data: Venda[]; isDemo: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/sales`);
      if (!res.ok) throw new Error('Falha na resposta');
      const json = await res.json();
      return { data: json.data, isDemo: json.source === 'demonstrative_mock' };
    } catch (e) {
      return { data: LOCAL_DEMO_VENDAS, isDemo: true };
    }
  },

  // Dashboard Metrics
  async getMetrics(): Promise<{ data: DashboardMetrics; isDemo: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/metrics`);
      if (!res.ok) throw new Error('Falha na resposta');
      const json = await res.json();
      return { data: json.data, isDemo: json.source === 'demonstrative_mock' };
    } catch (e) {
      return {
        data: {
          totalClientes: LOCAL_DEMO_CLIENTES.length,
          totalProdutos: LOCAL_DEMO_PRODUTOS.length,
          totalPecasEstoque: 57,
          totalVendas: LOCAL_DEMO_VENDAS.length,
          faturamentoTotal: 2587.60,
          clientesPrecisaAtencao: 3
        },
        isDemo: true
      };
    }
  },

  // Pipeline
  async getPipeline(): Promise<{ data: PipelineItem[]; isDemo: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/pipeline`);
      if (!res.ok) throw new Error('Falha na resposta');
      const json = await res.json();
      return { data: json.data, isDemo: json.source === 'demonstrative_mock' };
    } catch (e) {
      return { data: LOCAL_DEMO_PIPELINE, isDemo: true };
    }
  },

  async updatePipelineStage(id: number, etapa: string, anotacoes?: string) {
    try {
      await fetch(`${API_BASE_URL}/pipeline/${id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etapa, anotacoes })
      });
    } catch (e) {
      const item = LOCAL_DEMO_PIPELINE.find(p => p.id === id);
      if (item) {
        item.etapa = etapa as any;
        if (anotacoes) item.anotacoes = anotacoes;
      }
    }
  },

  // ==========================================
  // Módulo de Inteligência Artificial & OpenRouter
  // ==========================================
  async getAiInsights(): Promise<{ data: AiInsightSummary; memoryStats: any; isDemo: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/insights`);
      if (!res.ok) throw new Error('Falha na resposta da API');
      const json = await res.json();
      return {
        data: json.data,
        memoryStats: json.memoryStats,
        isDemo: !!json.data.isSimulated
      };
    } catch (e) {
      console.warn('API de IA offline, utilizando dados analíticos locais:', e);
      return {
        data: LOCAL_DEMO_AI_INSIGHTS,
        memoryStats: {
          iterationCount: 1,
          lineCount: 35,
          charCount: LOCAL_DEMO_AI_MEMORY.length,
          lastUpdated: new Date().toISOString()
        },
        isDemo: true
      };
    }
  },

  async runAiAnalysis(options?: {
    apiKey?: string;
    model?: string;
    customNote?: string;
  }): Promise<{ data: AiInsightSummary; memoryStats: any; isDemo: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options || {})
      });
      if (!res.ok) throw new Error('Falha ao processar ciclo de IA');
      const json = await res.json();
      return {
        data: json.data,
        memoryStats: json.memoryStats,
        isDemo: !!json.data.isSimulated
      };
    } catch (e) {
      console.warn('Backend indisponível, simulando ciclo de IA localmente:', e);
      LOCAL_DEMO_AI_INSIGHTS.iteracao_aprendizado += 1;
      LOCAL_DEMO_AI_INSIGHTS.data_analise = new Date().toISOString();
      return {
        data: LOCAL_DEMO_AI_INSIGHTS,
        memoryStats: {
          iterationCount: LOCAL_DEMO_AI_INSIGHTS.iteracao_aprendizado,
          lineCount: 42,
          charCount: LOCAL_DEMO_AI_MEMORY.length + 300,
          lastUpdated: new Date().toISOString()
        },
        isDemo: true
      };
    }
  },

  async getAiMemory(): Promise<AiMemoryInfo> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/memory`);
      if (!res.ok) throw new Error('Falha ao buscar arquivo de memória');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return {
        memoryContent: LOCAL_DEMO_AI_MEMORY,
        lastUpdated: new Date().toISOString(),
        iterationCount: 1,
        charCount: LOCAL_DEMO_AI_MEMORY.length,
        lineCount: LOCAL_DEMO_AI_MEMORY.split('\n').length,
        filePath: 'backend/data/ai_patterns_memory.txt'
      };
    }
  },

  async resetAiMemory(): Promise<AiMemoryInfo> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/memory/reset`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Falha ao resetar memória');
      const json = await res.json();
      return json.data;
    } catch (e) {
      LOCAL_DEMO_AI_INSIGHTS.iteracao_aprendizado = 0;
      return {
        memoryContent: '# Memória resetada para o ciclo inicial.',
        lastUpdated: new Date().toISOString(),
        iterationCount: 0,
        charCount: 40,
        lineCount: 1,
        filePath: 'backend/data/ai_patterns_memory.txt'
      };
    }
  },

  async getAiConfig(): Promise<AiConfigInfo> {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/config`);
      if (!res.ok) throw new Error('Falha ao buscar config de IA');
      const json = await res.json();
      return {
        freeModels: json.freeModels,
        defaultModel: json.defaultModel,
        hasServerKey: json.hasServerKey
      };
    } catch (e) {
      return {
        freeModels: [
          'meta-llama/llama-3.3-70b-instruct:free',
          'google/gemini-2.0-flash-exp:free',
          'deepseek/deepseek-r1:free',
          'qwen/qwen-2.5-coder-32b-instruct:free',
          'meta-llama/llama-3.1-8b-instruct:free'
        ],
        defaultModel: 'meta-llama/llama-3.3-70b-instruct:free',
        hasServerKey: false
      };
    }
  }
};

// Fallback demonstrativo de IA
export const LOCAL_DEMO_AI_INSIGHTS: AiInsightSummary = {
  resumo_executivo: 'A IA identificou correlação direta entre o serviço de Mala em Casa e a duplicação do ticket médio. Clientes que preferem alfaiataria (Juliana e Mariana) apresentam 100% de adesão a tecidos nobres naturais (linho puro e seda), enquanto clientes de estilo minimalista priorizam peças monocromáticas nas cores Fendi e Off-White.',
  padroes_descobertos: [
    {
      categoria: 'Mala em Casa & VIP',
      titulo: 'Mala em Casa eleva ticket médio em 145%',
      descricao: 'Clientes atendidas via Mala em Casa alcançam ticket médio de R$ 919,00, contra R$ 374,00 em compras convencionais. Alto índice de retenção das peças de linho.',
      clientes_relacionadas: ['Mariana Silva Alencar', 'Juliana Mendes Carvalho']
    },
    {
      categoria: 'Estilo & Modelagem',
      titulo: 'Afinidade por Alfaiataria Estruturada em Tamanhos M/G',
      descricao: 'Cortes retos de alfaiataria (blazers areia, pantalonas e coletes) são as peças com maior giro entre profissionais liberais da base.',
      clientes_relacionadas: ['Juliana Mendes Carvalho', 'Mariana Silva Alencar']
    },
    {
      categoria: 'Ticket & Cross-selling',
      titulo: 'Cross-selling Natural entre Camisas de Seda e Pantalonas',
      descricao: 'Clientes que adquiriram calça de alfaiataria demonstraram interesse imediato em camisas de seda off-white e cintos de couro fino para compor o look completo.',
      clientes_relacionadas: ['Camila Rocha Fontes', 'Beatriz Costa Prado']
    },
    {
      categoria: 'Comportamento & Frequência',
      titulo: 'Ciclo Sazonal de Recompra a cada 60-75 dias',
      descricao: 'Clientes do segmento contemporâneo VIP concentram compras no início de trocas sazonais de coleção. Helena Albuquerque está no momento ideal de recontato.',
      clientes_relacionadas: ['Helena Albuquerque']
    }
  ],
  acoes_recomendadas: [
    {
      prioridade: 'Alta',
      acao: 'Agendar envio de mala personalizada com Colete Linho Cru e Blazer Areia para Juliana Carvalho',
      cliente_sugerida: 'Juliana Mendes Carvalho',
      motivo: 'Comprou conjunto de alfaiataria recentemente e seu tamanho G/42 está com peças compatíveis em estoque.'
    },
    {
      prioridade: 'Alta',
      acao: 'Fazer contato VIP de reativação com Helena Albuquerque para preview de fim de ano',
      cliente_sugerida: 'Helena Albuquerque',
      motivo: 'Cliente inativa há 75 dias. Histórico demonstra compras de alto valor no início da temporada.'
    },
    {
      prioridade: 'Media',
      acao: 'Apresentar Camisa de Seda Off-White com fita de madrepérola para Camila Rocha',
      cliente_sugerida: 'Camila Rocha Fontes',
      motivo: 'Estilo minimalista tamanho P perfeitamente alinhado com o acervo disponível.'
    }
  ],
  data_analise: '2026-10-22T17:00:00.000Z',
  modelo_utilizado: 'meta-llama/llama-3.3-70b-instruct:free (OpenRouter)',
  iteracao_aprendizado: 1,
  total_clientes_analisados: 5,
  isSimulated: true
};

export const LOCAL_DEMO_AI_MEMORY = `# ========================================================
# 🛍️ AURA BOUTIQUE — MEMÓRIA COGNITIVA DE CLIENTES (CRM IA)
# ========================================================
# Este arquivo armazena a base de conhecimento acumulada pelas LLMs
# do OpenRouter a cada ciclo de análise.
# Ele é lido pelo agente antes de cada nova análise para fornecer
# contexto histórico contínuo e permitir aprendizado cumulativo.
# ========================================================

--- CICLO BASE #0: INICIALIZAÇÃO DO CONHECIMENTO ---
Data: 22/10/2026 10:00:00
Status: Estrutura inicial do CRM estabelecida.

--- CICLO DE APRENDIZADO #1 (22/10/2026 17:00:00) ---
Total de Clientes Analisadas: 5
Total de Vendas no Histórico: 4
Modelo Utilizado: meta-llama/llama-3.3-70b-instruct:free

[SÍNTESE DE APRENDIZADO CONSOLIDADO]
1. O serviço de Mala em Casa é a alavanca de maior valor percebido pela cliente de alta renda (ticket médio supera R$ 900).
2. Tecidos nobres como seda pura e linho cru têm rejeição zero quando apresentados em cortes de alfaiataria contemporânea.
3. Clientes com estilo Minimalista Chic recusam estampas florais e priorizam paleta Fendi/Off-white/Noir.
4. Helena Albuquerque necessita de protocolo ativo de relacionamento preventivo aos 60 dias de inatividade.
`;

