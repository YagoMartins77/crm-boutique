import React from 'react';
import { BarChart3, TrendingUp, Sparkles, PieChart, Users, ShoppingBag } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner de Demonstração */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: 'var(--color-sand-light)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="var(--color-gold)" />
          <div>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)' }}>
              Área de Demonstração Analítica
            </span>
            <p style={{ fontSize: '12px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
              Esta página apresenta a estrutura visual planejada para relatórios consolidados em etapas futuras.
            </p>
          </div>
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          padding: '4px 10px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-full)',
          color: 'var(--color-charcoal)'
        }}>
          Preview de Funcionalidade
        </span>
      </div>

      {/* Grid de Relatórios Demonstrativos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Distribuição por Categoria */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', marginBottom: '16px' }}>
            Distribuição de Peças por Categoria
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { cat: 'Vestidos & Festas', perc: '42%', cor: 'var(--color-gold)' },
              { cat: 'Alfaiataria & Blazers', perc: '28%', cor: 'var(--color-charcoal)' },
              { cat: 'Camisas & Sedas Puras', perc: '18%', cor: 'var(--color-warm-gray)' },
              { cat: 'Acessórios & Couro', perc: '12%', cor: 'var(--color-sand)' }
            ].map(item => (
              <div key={item.cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span>{item.cat}</span>
                  <span style={{ fontWeight: 600 }}>{item.perc}</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: item.perc, height: '100%', backgroundColor: item.cor }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perfil de Tamanhos das Clientes */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', marginBottom: '16px' }}>
            Curva de Tamanhos Mais Demandados
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center', paddingTop: '10px' }}>
            {[
              { tam: 'PP', qtd: '10%', altura: '30%' },
              { tam: 'P', qtd: '35%', altura: '80%' },
              { tam: 'M', qtd: '40%', altura: '95%', destaque: true },
              { tam: 'G', qtd: '12%', altura: '35%' },
              { tam: 'GG', qtd: '3%', altura: '15%' }
            ].map(b => (
              <div key={b.tam} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '140px', justifyContent: 'flex-end', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{b.qtd}</span>
                <div style={{ width: '100%', height: b.altura, backgroundColor: b.destaque ? 'var(--color-gold)' : 'var(--color-sand)', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-noir)' }}>{b.tam}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
