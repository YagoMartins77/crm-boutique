import React, { useState, useEffect } from 'react';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Clock,
  Sparkles,
  ChevronRight,
  Plus,
  Brain,
  ArrowRight,
  Tag,
  Layers
} from 'lucide-react';
import { DashboardMetrics, Cliente, Produto, Venda, AiInsightSummary } from '../types';
import { api } from '../services/api';

interface DashboardPageProps {
  metrics: DashboardMetrics;
  recentClients: Cliente[];
  recentProducts: Produto[];
  recentSales: Venda[];
  isDemoData: boolean;
  onNavigate: (tab: any) => void;
  onNewClient: () => void;
  onNewProduct: () => void;
  onSelectClient: (cliente: Cliente) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  metrics,
  recentClients,
  recentProducts,
  recentSales,
  isDemoData,
  onNavigate,
  onNewClient,
  onNewProduct,
  onSelectClient
}) => {
  const [aiInsights, setAiInsights] = useState<AiInsightSummary | null>(null);

  useEffect(() => {
    api.getAiInsights()
      .then(res => setAiInsights(res.data))
      .catch(err => console.warn('Não foi possível carregar insights no dashboard:', err));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Banner Demonstrativo Discreto e Elegante */}
      {isDemoData && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          backgroundColor: 'var(--color-sand-light)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12.5px',
          color: 'var(--color-charcoal)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={15} color="var(--color-gold)" />
            <span>
              <strong>Ambiente de Demonstração:</strong> Os dados abaixo são demonstrativos e preparados para expansão com o MySQL.
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)' }}>
            Status: Ativo & Responsivo
          </span>
        </div>
      )}

      {/* Cards com Indicadores / Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '20px'
      }}>
        {/* Card 1: Total Clientes */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Clientes Ativas
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-sand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="var(--color-charcoal)" />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600 }}>
            {metrics.totalClientes}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#16A34A', marginTop: '8px' }}>
            <ArrowUpRight size={14} />
            <span>+2 novas neste mês</span>
          </div>
        </div>

        {/* Card 2: Peças Cadastradas */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Peças no Catálogo
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-sand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} color="var(--color-charcoal)" />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600 }}>
            {metrics.totalProdutos}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-warm-gray)', marginTop: '8px' }}>
            {metrics.totalPecasEstoque} unidades totais em estoque
          </div>
        </div>

        {/* Card 3: Vendas do Período */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Faturamento do Período
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} color="var(--color-gold-hover)" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600 }}>
            {metrics.faturamentoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#16A34A', marginTop: '8px' }}>
            <span>{metrics.totalVendas} vendas registradas</span>
          </div>
        </div>

        {/* Card 4: Clientes Precisam de Acompanhamento */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pós-Venda & Retorno
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-terracotta-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={18} color="var(--color-terracotta)" />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600 }}>
            {metrics.clientesPrecisaAtencao}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-terracotta)', marginTop: '8px', fontWeight: 500 }}>
            Clientes aguardando contato
          </div>
        </div>
      </div>

      {/* Widget de Resumo de Inteligência & Aprendizado das Clientes (IA) */}
      {aiInsights && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Brain size={20} color="var(--color-gold-hover)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
                    Inteligência de Clientes & Padrões Aprendidos
                  </h3>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-sand-light)',
                    color: 'var(--color-charcoal)'
                  }}>
                    Ciclo #{aiInsights.iteracao_aprendizado}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
                  Resumo cognitivo consolidado a partir do histórico e da memória evolutiva gravada em texto.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('ai')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-gold-hover)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-gold-light)',
                transition: 'var(--transition-fast)'
              }}
            >
              <span>Abrir Central de IA & Memória</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Texto do Resumo Executivo */}
          <div style={{
            fontSize: '13.5px',
            color: 'var(--color-charcoal)',
            lineHeight: 1.65,
            padding: '16px 20px',
            backgroundColor: 'var(--color-sand-light)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--color-gold)'
          }}>
            {aiInsights.resumo_executivo}
          </div>

          {/* Destaque dos Padrões e Próximas Ações */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {aiInsights.padroes_descobertos.slice(0, 2).map((padrao, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'var(--bg-body)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-gold-hover)' }}>
                    {padrao.categoria}
                  </span>
                </div>
                <h5 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)', margin: 0 }}>
                  {padrao.titulo}
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>
                  {padrao.descricao}
                </p>
              </div>
            ))}

            {aiInsights.acoes_recomendadas[0] && (
              <div style={{
                padding: '14px 16px',
                backgroundColor: 'var(--color-sand-light)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-terracotta)' }}>
                  Ação Prioritária Sugerida
                </span>
                <h5 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)', margin: 0 }}>
                  {aiInsights.acoes_recomendadas[0].acao}
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>
                  {aiInsights.acoes_recomendadas[0].motivo}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gráfico Simples e Elegante de Vendas por Período */}

      <div style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '28px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)' }}>
              Evolução de Vendas & Faturamento Semanal
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
              Desempenho da boutique no mês corrente (Dados demonstrativos de acompanhamento)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              backgroundColor: 'var(--color-sand-light)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-charcoal)'
            }}>
              Outubro / 2026
            </span>
          </div>
        </div>

        {/* Gráfico de Barras em CSS Sofisticado */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '16px', alignItems: 'flex-end', height: '180px', paddingTop: '20px', borderBottom: '1px solid var(--border-light)' }}>
          {[
            { dia: 'Seg', valor: 'R$ 849', altura: '45%' },
            { dia: 'Ter', valor: 'R$ 389', altura: '25%' },
            { dia: 'Qua', valor: 'R$ 1.280', altura: '70%' },
            { dia: 'Qui', valor: 'R$ 620', altura: '35%' },
            { dia: 'Sex', valor: 'R$ 1.890', altura: '95%', destaque: true },
            { dia: 'Sáb', valor: 'R$ 1.450', altura: '80%' },
            { dia: 'Dom', valor: 'Fechado', altura: '5%' }
          ].map((bar, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', fontWeight: 500 }}>{bar.valor}</span>
              <div style={{
                width: '100%',
                maxWidth: '48px',
                height: bar.altura,
                backgroundColor: bar.destaque ? 'var(--color-gold)' : 'var(--color-sand)',
                borderRadius: '6px 6px 0 0',
                transition: 'var(--transition-normal)'
              }} />
              <span style={{ fontSize: '12px', color: 'var(--color-charcoal)', fontWeight: bar.destaque ? 600 : 400, marginTop: '4px' }}>
                {bar.dia}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de 2 Colunas: Atividades Recentes + Clientes que precisam de atenção */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Atividades Recentes */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)' }}>
              Atividades Recentes da Boutique
            </h3>
            <button
              onClick={() => onNavigate('sales')}
              style={{ fontSize: '12px', color: 'var(--color-gold-hover)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Ver todas</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentSales.slice(0, 4).map(sale => (
              <div
                key={sale.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-body)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)' }}>
                    {sale.cliente_nome}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>
                    {sale.observacoes || 'Compra finalizada'} • {sale.forma_pagamento}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>
                    {sale.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span style={{ fontSize: '11px', color: '#16A34A' }}>Concluída</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clientes que precisam de atenção / Pós-Venda */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)' }}>
              Clientes que Precisam de Atenção
            </h3>
            <button
              onClick={() => onNavigate('relationship')}
              style={{ fontSize: '12px', color: 'var(--color-gold-hover)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Abrir Pipeline</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentClients.slice(0, 4).map(cliente => (
              <div
                key={cliente.id}
                onClick={() => onSelectClient(cliente)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-body)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)' }}>
                    {cliente.nome}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>
                    Estilo: {cliente.estilo_preferido} • Tam: {cliente.tamanho_superior || 'M'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    backgroundColor: 'var(--color-sand-light)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-charcoal)'
                  }}>
                    Ficha VIP
                  </span>
                  <ChevronRight size={14} color="var(--color-warm-gray)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
