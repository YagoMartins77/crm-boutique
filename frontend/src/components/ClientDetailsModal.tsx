import React from 'react';
import { Modal } from './Modal';
import { Cliente } from '../types';
import { Phone, Mail, Calendar, Sparkles, MessageCircle } from 'lucide-react';

interface ClientDetailsModalProps {
  cliente: Cliente | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  cliente,
  isOpen,
  onClose
}) => {
  if (!cliente) return null;

  const handleWhatsApp = () => {
    const cleanPhone = cliente.telefone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const message = encodeURIComponent(`Olá, ${cliente.nome}! Passando para falar sobre as novidades exclusivas da Aura Boutique ✨`);
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={cliente.nome}
      subtitle="Ficha de Perfil e Histórico da Cliente"
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Contato Rápido & Ações */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          backgroundColor: 'var(--color-sand-light)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-charcoal)' }}>
              <Phone size={15} color="var(--color-warm-gray)" />
              <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{cliente.telefone}</span>
            </div>
            {cliente.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warm-gray)', marginTop: '4px' }}>
                <Mail size={15} />
                <span style={{ fontSize: '12.5px' }}>{cliente.email}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleWhatsApp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <MessageCircle size={15} />
            <span>Falar no WhatsApp</span>
          </button>
        </div>

        {/* Ficha de Medidas */}
        <div>
          <span style={{
            display: 'block',
            fontSize: '11.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-warm-gray)',
            fontWeight: 600,
            marginBottom: '10px'
          }}>
            Tamanhos e Medidas Cadastradas
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase' }}>Superior</span>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-noir)', marginTop: '4px' }}>
                {cliente.tamanho_superior || '—'}
              </p>
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase' }}>Inferior</span>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-noir)', marginTop: '4px' }}>
                {cliente.tamanho_inferior || '—'}
              </p>
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase' }}>Calçado</span>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-noir)', marginTop: '4px' }}>
                {cliente.tamanho_calcado || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Estilo e Aniversário */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
          <div style={{
            padding: '14px 16px',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="var(--color-gold)" />
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estilo Predominante
              </span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>
              {cliente.estilo_preferido || 'Não definido'}
            </p>
          </div>

          <div style={{
            padding: '14px 16px',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Calendar size={14} color="var(--color-gold)" />
              <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Nascimento
              </span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>
              {cliente.data_nascimento ? new Date(cliente.data_nascimento).toLocaleDateString('pt-BR') : 'Não informada'}
            </p>
          </div>
        </div>

        {/* Observações da Consultoria */}
        <div>
          <span style={{
            display: 'block',
            fontSize: '11.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-warm-gray)',
            fontWeight: 600,
            marginBottom: '6px'
          }}>
            Anotações da Consultora de Imagem
          </span>
          <div style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-body)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            fontSize: '13px',
            color: 'var(--color-charcoal)',
            lineHeight: 1.6
          }}>
            {cliente.observacoes || 'Nenhuma anotação registrada ainda para esta cliente.'}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px',
              backgroundColor: 'var(--color-noir)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};
