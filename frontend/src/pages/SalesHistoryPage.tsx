import React from 'react';
import { Receipt, CreditCard, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Venda } from '../types';

interface SalesHistoryPageProps {
  vendas: Venda[];
  isDemoData: boolean;
}

export const SalesHistoryPage: React.FC<SalesHistoryPageProps> = ({
  vendas,
  isDemoData
}) => {
  const faturamentoTotal = vendas.reduce((acc, curr) => acc + curr.valor_total, 0);
  const ticketMedio = vendas.length > 0 ? faturamentoTotal / vendas.length : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Resumo de Indicadores Financeiros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Faturamento Acumulado
          </span>
          <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600, marginTop: '8px' }}>
            {faturamentoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)', marginTop: '4px', display: 'block' }}>
            {vendas.length} transações registradas
          </span>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Ticket Médio por Venda
          </span>
          <div style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', fontWeight: 600, marginTop: '8px' }}>
            {ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <span style={{ fontSize: '12px', color: '#16A34A', marginTop: '4px', display: 'block' }}>
            Excelente padrão para boutique
          </span>
        </div>
      </div>

      {/* Tabela de Vendas */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Histórico de Transações da Boutique
          </h3>
          {isDemoData && (
            <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)' }}>
              * Dados demonstrativos sincronizados com tabela vendas
            </span>
          )}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-sand-light)', borderBottom: '1px solid var(--border-light)', color: 'var(--color-warm-gray)' }}>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID / Data</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observações / Itens</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pagamento</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map(venda => (
                <tr key={venda.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ display: 'block', fontWeight: 600, color: 'var(--color-noir)' }}>
                      #{venda.id}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-warm-gray)' }}>
                      {venda.data_venda ? new Date(venda.data_venda).toLocaleDateString('pt-BR') : 'Hoje'}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-noir)' }}>
                      {venda.cliente_nome || `Cliente ID #${venda.cliente_id}`}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px', color: 'var(--color-charcoal)' }}>
                    {venda.observacoes || 'Venda de peças de alfaiataria e seda'}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: 'var(--color-sand-light)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)'
                    }}>
                      {venda.forma_pagamento}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-noir)' }}>
                      {venda.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
