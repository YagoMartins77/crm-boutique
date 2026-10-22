import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Receipt,
  HeartHandshake,
  BarChart3,
  Settings,
  Sparkles,
  ExternalLink,
  Brain
} from 'lucide-react';

export type NavItem =
  | 'overview'
  | 'ai'
  | 'clients'
  | 'products'
  | 'sales'
  | 'relationship'
  | 'reports'
  | 'settings';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  onOpenStorefront: () => void;
  isBackendConnected?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenStorefront,
  isBackendConnected = true
}) => {
  const menuItems = [
    { id: 'overview' as NavItem, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'ai' as NavItem, label: 'Inteligência & IA', icon: Brain },
    { id: 'clients' as NavItem, label: 'Clientes', icon: Users },
    { id: 'products' as NavItem, label: 'Produtos / Peças', icon: ShoppingBag },
    { id: 'sales' as NavItem, label: 'Histórico de Compras', icon: Receipt },
    { id: 'relationship' as NavItem, label: 'Relacionamento & Pós-Venda', icon: HeartHandshake },
    { id: 'reports' as NavItem, label: 'Relatórios', icon: BarChart3 },
    { id: 'settings' as NavItem, label: 'Configurações', icon: Settings }
  ];


  return (
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--color-noir)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '28px 18px',
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{ padding: '0 12px 32px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles size={16} color="var(--color-gold)" />
          <span style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            fontWeight: 600
          }}>
            Atelier & Boutique
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '24px',
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: '#FAF8F5',
          margin: 0
        }}>
          AURA CRM
        </h1>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '4px',
          fontWeight: 300
        }}>
          Gestão de Moda Feminina
        </p>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
          padding: '0 12px 10px 12px',
          fontWeight: 600
        }}>
          Painel Administrativo
        </span>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'rgba(184, 151, 108, 0.15)' : 'transparent',
                color: isActive ? 'var(--color-gold)' : 'rgba(255,255,255,0.7)',
                borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                fontSize: '13.5px',
                fontWeight: isActive ? 600 : 400,
                transition: 'var(--transition-fast)',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Storefront Action & Status */}
      <div style={{
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Switch to Client Area */}
        <button
          onClick={onOpenStorefront}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-sm)',
            color: '#FFFFFF',
            fontSize: '12.5px',
            fontWeight: 500,
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(184, 151, 108, 0.2)';
            e.currentTarget.style.borderColor = 'var(--color-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} color="var(--color-gold)" />
            <span>Ver Área da Cliente</span>
          </div>
          <ExternalLink size={14} color="rgba(255,255,255,0.5)" />
        </button>

        {/* Database Status indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.45)'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isBackendConnected ? '#4ADE80' : '#FBBF24',
            display: 'inline-block'
          }} />
          <span>{isBackendConnected ? 'MySQL 8.0 Conectado' : 'Modo Demonstrativo'}</span>
        </div>
      </div>
    </aside>
  );
};
