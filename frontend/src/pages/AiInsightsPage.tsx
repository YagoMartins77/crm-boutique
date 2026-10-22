import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Key,
  Copy,
  Check,
  Trash2,
  Brain,
  MessageCircle,
  FileText,
  AlertCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  Tag
} from 'lucide-react';
import { AiInsightSummary, AiMemoryInfo, AiConfigInfo, Cliente } from '../types';
import { api } from '../services/api';

interface AiInsightsPageProps {
  clientes?: Cliente[];
}

export const AiInsightsPage: React.FC<AiInsightsPageProps> = ({ clientes = [] }) => {
  const [insights, setInsights] = useState<AiInsightSummary | null>(null);
  const [memoryInfo, setMemoryInfo] = useState<AiMemoryInfo | null>(null);
  const [config, setConfig] = useState<AiConfigInfo>({
    freeModels: [
      'meta-llama/llama-3.3-70b-instruct:free',
      'google/gemini-2.0-flash-exp:free',
      'deepseek/deepseek-r1:free',
      'qwen/qwen-2.5-coder-32b-instruct:free',
      'meta-llama/llama-3.1-8b-instruct:free'
    ],
    defaultModel: 'meta-llama/llama-3.3-70b-instruct:free',
    hasServerKey: false
  });

  const [selectedModel, setSelectedModel] = useState<string>('meta-llama/llama-3.3-70b-instruct:free');
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => localStorage.getItem('aura_openrouter_key') || '');
  const [customNote, setCustomNote] = useState<string>('');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isMemoryExpanded, setIsMemoryExpanded] = useState<boolean>(false);
  const [copiedMemory, setCopiedMemory] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Carrega os dados iniciais
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [insightsRes, memoryRes, configRes] = await Promise.all([
        api.getAiInsights(),
        api.getAiMemory(),
        api.getAiConfig()
      ]);

      setInsights(insightsRes.data);
      setMemoryInfo(memoryRes);
      setConfig(configRes);

      if (configRes.defaultModel) {
        setSelectedModel(configRes.defaultModel);
      }
    } catch (e) {
      console.warn('Erro ao carregar dados de IA:', e);
    }
  };

  // Salva chave de API localmente no navegador
  const handleSaveApiKey = () => {
    localStorage.setItem('aura_openrouter_key', apiKeyInput.trim());
    setStatusMessage('Chave do OpenRouter salva para esta sessão!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Executa o ciclo de aprendizado
  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setStatusMessage('Executando aprendizado com a LLM do OpenRouter e lendo memória...');

    try {
      const activeKey = apiKeyInput.trim() || undefined;
      const res = await api.runAiAnalysis({
        apiKey: activeKey,
        model: selectedModel,
        customNote: customNote.trim() || undefined
      });

      setInsights(res.data);

      // Recarrega o arquivo de memória atualizado
      const updatedMemory = await api.getAiMemory();
      setMemoryInfo(updatedMemory);

      setStatusMessage('Ciclo de aprendizado concluído e gravado no arquivo de texto com sucesso!');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (e: any) {
      console.error('Erro na análise:', e);
      setStatusMessage('Ocorreu uma falha no processamento, ativando fallback resiliente.');
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  // Reseta o arquivo de memória para recomeçar o aprendizado do zero
  const handleResetMemory = async () => {
    if (!window.confirm('Tem certeza de que deseja resetar o arquivo de memória de aprendizado? As LLMs recomeçarão o ciclo do zero.')) {
      return;
    }

    setIsResetting(true);
    try {
      const res = await api.resetAiMemory();
      setMemoryInfo(res);
      setStatusMessage('Arquivo de memória reinicializado. Novo ciclo começará do zero.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error('Erro ao resetar:', e);
    } finally {
      setIsResetting(false);
    }
  };

  // Copia o conteúdo do arquivo de texto para a área de transferência
  const handleCopyMemory = () => {
    if (!memoryInfo?.memoryContent) return;
    navigator.clipboard.writeText(memoryInfo.memoryContent);
    setCopiedMemory(true);
    setTimeout(() => setCopiedMemory(false), 2500);
  };

  // Formata link de WhatsApp para ação direta com a cliente
  const getWhatsAppLink = (clienteNome?: string, motivo?: string) => {
    const cli = clientes.find(c => c.nome.toLowerCase() === (clienteNome || '').toLowerCase());
    const tel = cli?.telefone ? cli.telefone.replace(/\D/g, '') : '5511999999999';
    const msg = encodeURIComponent(`Olá ${clienteNome || 'tudo bem'}! Aqui é da curadoria da Aura Boutique. Com base no seu estilo e nas preferências que acompanhamos, separamos novidades que combinam perfeitamente com você.`);
    return `https://wa.me/55${tel}?text=${msg}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px' }}>
      {/* Banner de Feedback de Status */}
      {statusMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          backgroundColor: 'var(--color-sand-light)',
          border: '1px solid var(--color-gold)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          color: 'var(--color-noir)',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <Sparkles size={16} color="var(--color-gold)" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Topo / Header da Central de IA */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Brain size={16} color="var(--color-gold-hover)" />
              </div>
              <span style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-gold-hover)',
                fontWeight: 600
              }}>
                OpenRouter Haute Couture Engine
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
              Inteligência Artificial & Aprendizado Contínuo de Clientes
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-warm-gray)', marginTop: '4px' }}>
              As LLMs gratuitas analisam os dados dos clientes, descobrem correlações de estilo e medidas, e acumulam o conhecimento gravando em um arquivo de texto para as próximas gerações.
            </p>
          </div>

          {/* Botão Principal de Ação */}
          <button
            onClick={handleRunAnalysis}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              backgroundColor: isLoading ? 'var(--color-warm-gray)' : 'var(--color-noir)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-fast)'
            }}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isLoading ? 'Analisando e Gravando Memória...' : 'Executar Aprendizado com IA'}</span>
          </button>
        </div>

        {/* Barra de Status e Parâmetros Rápidos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'var(--bg-body)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontSize: '12.5px'
        }}>
          <div>
            <span style={{ color: 'var(--color-warm-gray)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Modelo Ativo</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginTop: '2px', color: 'var(--color-noir)' }}>
              <Cpu size={14} color="var(--color-gold)" />
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{selectedModel}</span>
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--color-warm-gray)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Ciclo Acumulado</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginTop: '2px', color: 'var(--color-noir)' }}>
              <Layers size={14} color="var(--color-gold)" />
              <span>Ciclo #{memoryInfo?.iterationCount ?? insights?.iteracao_aprendizado ?? 0}</span>
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--color-warm-gray)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Clientes na Memória</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginTop: '2px', color: 'var(--color-noir)' }}>
              <Zap size={14} color="var(--color-gold)" />
              <span>{insights?.total_clientes_analisados ?? clientes.length} clientes mapeadas</span>
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--color-warm-gray)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Status da Chave</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginTop: '2px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: (config.hasServerKey || apiKeyInput.trim()) ? '#16A34A' : '#EAB308'
              }} />
              <span style={{ color: (config.hasServerKey || apiKeyInput.trim()) ? '#16A34A' : '#CA8A04' }}>
                {config.hasServerKey ? 'Chave no .env' : (apiKeyInput.trim() ? 'Chave da Sessão' : 'Modo Demonstrativo Resiliente')}
              </span>
            </div>
          </div>
        </div>

        {/* Accordion de Configurações do OpenRouter */}
        <div>
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12.5px',
              color: 'var(--color-charcoal)',
              fontWeight: 500,
              padding: '6px 0'
            }}
          >
            <Key size={14} color="var(--color-gold)" />
            <span>{isConfigOpen ? 'Ocultar Parâmetros da API & Modelos Gratuitos' : 'Ajustar Modelo Gratuito do OpenRouter / Chave de API'}</span>
            {isConfigOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isConfigOpen && (
            <div style={{
              marginTop: '12px',
              padding: '20px',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px' }}>
                    Modelo Gratuito do OpenRouter:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {config.freeModels.map(m => (
                      <option key={m} value={m}>{m} (Grátis)</option>
                    ))}
                  </select>
                  <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', marginTop: '4px', display: 'block' }}>
                    Caso o modelo selecionado atinja limite de taxa (429), o sistema tenta automaticamente os demais da lista.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px' }}>
                    Chave de API do OpenRouter (Opcional se definida no .env):
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="password"
                      placeholder="sk-or-v1-..."
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '13px'
                      }}
                    />
                    <button
                      onClick={handleSaveApiKey}
                      style={{
                        padding: '0 16px',
                        backgroundColor: 'var(--color-gold)',
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Salvar
                    </button>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', marginTop: '4px', display: 'block' }}>
                    Obtenha sua chave gratuita em <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold-hover)' }}>openrouter.ai/keys</a>. Sem chave, o sistema utiliza simulação analítica offline inteligente.
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px' }}>
                  Orientação Específica para este Ciclo (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Focar na identificação de clientes para envio de mala de linho ou vestidos de festa"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção 1: Resumo Executivo para a Gestão */}
      {insights && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--color-gold)" />
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
                Resumo Executivo para a Direção da Boutique
              </h3>
            </div>
            <span style={{
              fontSize: '11px',
              padding: '4px 10px',
              backgroundColor: 'var(--color-sand-light)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-charcoal)',
              fontWeight: 500
            }}>
              Última Análise: {new Date(insights.data_analise).toLocaleString('pt-BR')}
            </span>
          </div>

          <div style={{
            fontSize: '14.5px',
            color: 'var(--color-charcoal)',
            lineHeight: 1.7,
            backgroundColor: 'var(--color-sand-light)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--color-gold)'
          }}>
            {insights.resumo_executivo}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', color: 'var(--color-warm-gray)', flexWrap: 'wrap' }}>
            <span><strong>Modelo Utilizado:</strong> {insights.modelo_utilizado}</span>
            <span>•</span>
            <span><strong>Clientes Analisadas:</strong> {insights.total_clientes_analisados}</span>
            <span>•</span>
            <span><strong>Geração de Memória:</strong> Ciclo #{insights.iteracao_aprendizado}</span>
          </div>
        </div>
      )}

      {/* Seção 2: Padrões Descobertos dos Clientes */}
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Padrões & Correlações Aprendidas
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
            Comportamentos e tendências extraídos do cruzamento de medidas, estilo e transações.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {insights?.padroes_descobertos.map((padrao, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-gold-light)',
                    color: 'var(--color-gold-hover)'
                  }}>
                    {padrao.categoria}
                  </span>
                </div>

                <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', marginBottom: '8px' }}>
                  {padrao.titulo}
                </h4>

                <p style={{ fontSize: '13px', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
                  {padrao.descricao}
                </p>
              </div>

              {padrao.clientes_relacionadas && padrao.clientes_relacionadas.length > 0 && (
                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', display: 'block', marginBottom: '6px' }}>
                    Clientes Mapeadas:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {padrao.clientes_relacionadas.map(c => (
                      <span
                        key={c}
                        style={{
                          fontSize: '11.5px',
                          padding: '2px 8px',
                          backgroundColor: 'var(--color-sand-light)',
                          borderRadius: 'var(--radius-full)',
                          color: 'var(--color-charcoal)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Tag size={10} color="var(--color-gold)" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Seção 3: Próximas Ações Recomendadas para o Consultor */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Recomendações Práticas para a Equipe de Atendimento
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
            Ações personalizadas baseadas nas correlações aprendidas para aumentar a conversão e estreitar laços.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insights?.acoes_recomendadas.map((acao, idx) => {
            const isHigh = acao.prioridade === 'Alta';
            return (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-body)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '280px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: isHigh ? 'var(--color-terracotta-light)' : 'var(--color-gold-light)',
                    color: isHigh ? 'var(--color-terracotta)' : 'var(--color-gold-hover)',
                    marginTop: '2px'
                  }}>
                    {acao.prioridade}
                  </span>
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)', margin: 0 }}>
                      {acao.acao}
                    </h5>
                    <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '4px' }}>
                      <strong>Motivo Estratégico:</strong> {acao.motivo}
                    </p>
                    {acao.cliente_sugerida && (
                      <span style={{ fontSize: '11.5px', color: 'var(--color-charcoal)', marginTop: '4px', display: 'inline-block' }}>
                        Cliente indicada: <strong>{acao.cliente_sugerida}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Botão de contato direto via WhatsApp */}
                <a
                  href={getWhatsAppLink(acao.cliente_sugerida, acao.motivo)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <MessageCircle size={14} />
                  <span>Abordar no WhatsApp</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção 4: O Arquivo de Memória Contínua (ai_patterns_memory.txt) */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--color-gold)" />
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
                Arquivo de Memória Contínua em Disco (<code>ai_patterns_memory.txt</code>)
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
              Texto bruto onde as LLMs registram o que aprenderam. Na próxima chamada, a LLM lê este arquivo como contexto prévio.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopyMemory}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'var(--bg-body)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                color: 'var(--color-charcoal)'
              }}
            >
              {copiedMemory ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
              <span>{copiedMemory ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handleResetMemory}
              disabled={isResetting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'var(--color-terracotta-light)',
                border: '1px solid var(--color-terracotta)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                color: 'var(--color-terracotta)',
                cursor: isResetting ? 'not-allowed' : 'pointer'
              }}
            >
              <Trash2 size={14} />
              <span>{isResetting ? 'Resetando...' : 'Resetar Memória'}</span>
            </button>

            <button
              onClick={() => setIsMemoryExpanded(!isMemoryExpanded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                backgroundColor: 'var(--color-noir)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}
            >
              <span>{isMemoryExpanded ? 'Recolher' : 'Expandir Arquivo Completo'}</span>
              {isMemoryExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Visualizador de Código com Estilo Monospace Refinado */}
        <div style={{
          backgroundColor: '#1E1B18',
          color: '#EDE8E1',
          padding: '20px',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'monospace',
          fontSize: '12.5px',
          lineHeight: 1.6,
          maxHeight: isMemoryExpanded ? '800px' : '260px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          {memoryInfo?.memoryContent || 'Carregando arquivo de memória...'}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          fontSize: '11.5px',
          color: 'var(--color-warm-gray)'
        }}>
          <span>
            Arquivo: <code>backend/data/ai_patterns_memory.txt</code> • {memoryInfo?.lineCount || 0} linhas • {memoryInfo?.charCount || 0} caracteres
          </span>
          <span>
            Ciclos de aprendizado gravados: <strong>{memoryInfo?.iterationCount || 0}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
