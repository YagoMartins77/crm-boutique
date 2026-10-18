import React from 'react';
import { Phone, Clock, MessageCircle, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { PipelineItem } from '../types';

interface RelationshipPageProps {
  pipeline: PipelineItem[];
  onUpdateStage: (id: number, etapa: string) => void;
  isDemoData: boolean;
}

export const RelationshipPage: React.FC<RelationshipPageProps> = ({
  pipeline,
  onUpdateStage,
  isDemoData
}) => {
  const etapas = [
    { key: 'Nova Cliente', label: 'Nova Cliente', color: '#64748B' },
    { key: 'Em Atendimento', label: 'Em Atendimento', color: '#0284C7' },
    { key: 'Mala em Casa', label: 'Mala em Casa', color: '#B8976C' },
    { key: 'Aguardando Pagamento', label: 'Aguardando Pagto.', color: '#F59E0B' },
    { key: 'Pos-Venda', label: 'Pós-Venda Ativo', color: '#16A34A' },
    { key: 'Inativa', label: 'Inativa (>60 dias)', color: '#A65D46' }
  ];

  const handleWhatsApp = (telefone?: string, nome?: string) => {
    if (!telefone) return;
    const cleanPhone = telefone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const message = encodeURIComponent(`Olá, ${nome || 'tudo bem'}! Gostaria de conversar com você sobre as peças da Aura Boutique ✨`);
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header com Contexto */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '20px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Pipeline de Relacionamento & Pós-Venda
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
            Acompanhamento do ciclo de vida das clientes: da primeira visita ao serviço de Mala em Casa e retenção
          </p>
        </div>
        {isDemoData && (
          <span style={{ fontSize: '11.5px', color: 'var(--color-warm-gray)', padding: '4px 10px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-full)' }}>
            Pipeline demonstrativo funcional
          </span>
        )}
      </div>

      {/* Colunas do Pipeline (Kanban / Funil de Atendimento) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        alignItems: 'flex-start'
      }}>
        {etapas.map(etapa => {
          const items = pipeline.filter(p => p.etapa === etapa.key);

          return (
            <div
              key={etapa.key}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '480px'
              }}
            >
              {/* Header da Coluna */}
              <div style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: etapa.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-noir)' }}>
                    {etapa.label}
                  </span>
                </div>
                <span style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  backgroundColor: 'var(--color-sand-light)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-charcoal)'
                }}>
                  {items.length}
                </span>
              </div>

              {/* Cards da Coluna */}
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {items.length === 0 ? (
                  <div style={{
                    padding: '24px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: 'var(--color-warm-gray)',
                    border: '1px dashed var(--border-light)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    Nenhuma cliente nesta etapa
                  </div>
                ) : (
                  items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: 'var(--bg-body)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '14px',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--color-noir)' }}>
                            {item.cliente_nome || `Cliente #${item.cliente_id}`}
                          </span>
                          {item.cliente_telefone && (
                            <span style={{ fontSize: '11.5px', color: 'var(--color-warm-gray)' }}>
                              {item.cliente_telefone}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.anotacoes && (
                        <p style={{
                          fontSize: '12px',
                          color: 'var(--color-charcoal)',
                          lineHeight: 1.5,
                          backgroundColor: '#FFFFFF',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--border-light)'
                        }}>
                          "{item.anotacoes}"
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-warm-gray)', paddingTop: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} />
                          <span>Último: {item.data_ultimo_contato || 'Recente'}</span>
                        </div>

                        {item.cliente_telefone && (
                          <button
                            onClick={() => handleWhatsApp(item.cliente_telefone, item.cliente_nome)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#16A34A',
                              fontWeight: 600,
                              fontSize: '11px'
                            }}
                          >
                            <MessageCircle size={12} />
                            <span>WhatsApp</span>
                          </button>
                        )}
                      </div>

                      {/* Seletor de mudança rápida de etapa */}
                      <div style={{ paddingTop: '6px', borderTop: '1px solid var(--border-light)' }}>
                        <select
                          value={item.etapa}
                          onChange={(e) => onUpdateStage(item.id!, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--border-light)',
                            fontSize: '11.5px',
                            backgroundColor: '#FFFFFF',
                            color: 'var(--color-charcoal)'
                          }}
                        >
                          {etapas.map(e => (
                            <option key={e.key} value={e.key}>Mover para: {e.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
