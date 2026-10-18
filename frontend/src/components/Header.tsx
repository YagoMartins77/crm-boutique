import React from 'react';
import { User, Bell, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNewClient: () => void;
  onNewProduct: () => void;
  onOpenStorefront: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle = 'Atelier & Boutique de Moda Feminina',
  onNewClient,
  onNewProduct,
  onOpenStorefront
}) => {
  return (
    <header style={{
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-light)',
      padding: '20px 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Title & Boutique Identity */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-noir)',
            margin: 0
          }}>
            {title}
          </h2>
          <span style={{
            fontSize: '11px',
            padding: '2px 8px',
            backgroundColor: 'var(--color-sand-light)',
            color: 'var(--color-warm-gray)',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.05em',
            fontWeight: 500
          }}>
            AURA BOUTIQUE
          </span>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'var(--color-warm-gray)',
          marginTop: '2px'
        }}>
          {subtitle}
        </p>
      </div>

      {/* Actions & Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Quick Action: Ver Loja / Área da Cliente */}
        <button
          onClick={onOpenStorefront}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            backgroundColor: 'var(--color-cream)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            fontWeight: 500,
            color: 'var(--color-charcoal)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-gold)';
            e.currentTarget.style.backgroundColor = 'var(--color-gold-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.backgroundColor = 'var(--color-cream)';
          }}
        >
          <Sparkles size={14} color="var(--color-gold)" />
          <span>Área da Cliente</span>
        </button>

        {/* Quick Action: Nova Cliente */}
        <button
          onClick={onNewClient}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            backgroundColor: 'var(--color-sand-light)',
            border: '1px solid var(--color-sand)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--color-charcoal)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-sand)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-sand-light)';
          }}
        >
          <Plus size={15} />
          <span>Cadastrar Cliente</span>
        </button>

        {/* Quick Action: Nova Peça */}
        <button
          onClick={onNewProduct}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 18px',
            backgroundColor: 'var(--color-noir)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12.5px',
            fontWeight: 500,
            transition: 'var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-charcoal)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-noir)';
          }}
        >
          <Plus size={15} color="var(--color-gold)" />
          <span>Cadastrar Peça</span>
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--border-light)' }} />

        {/* Notifications */}
        <button
          title="Notificações de Pós-Venda"
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-warm-gray)',
            backgroundColor: 'var(--bg-body)',
            border: '1px solid var(--border-light)'
          }}
        >
          <Bell size={16} />
          <span style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-terracotta)'
          }} />
        </button>

        {/* Admin Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '6px'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gold-light)',
            border: '1px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gold-hover)'
          }}>
            <User size={18} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-noir)' }}>
              Daniel Marçal
            </span>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-warm-gray)' }}>
              Administrador Geral
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
