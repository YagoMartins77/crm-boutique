import React from 'react';
import { Settings, Database, Store, ShieldCheck, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Store size={20} color="var(--color-gold)" />
          <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Dados da Boutique & Identidade
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-warm-gray)', marginBottom: '4px' }}>Nome da Boutique</label>
            <input
              type="text"
              readOnly
              value="AURA BOUTIQUE — Haute Couture & Atelier"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-body)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-warm-gray)', marginBottom: '4px' }}>Unidade Principal</label>
            <input
              type="text"
              readOnly
              value="Atelier Jardins - São Paulo / SP"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-body)' }}
            />
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Database size={20} color="var(--color-gold)" />
          <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Configuração de Conexão com o Banco de Dados
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-warm-gray)', marginBottom: '16px', lineHeight: 1.6 }}>
          A nova arquitetura conecta-se ao MySQL exclusivamente via variáveis de ambiente no backend (<code>backend/.env</code>), sem expor credenciais no frontend nem no controle de versão.
        </p>

        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-sand-light)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12.5px',
          fontFamily: 'monospace',
          lineHeight: 1.6
        }}>
          <div>DB_HOST: localhost</div>
          <div>DB_PORT: 3306</div>
          <div>DB_USER: root</div>
          <div>DB_NAME: boutique_crm</div>
          <div>STATUS: Conexão ativa via Pool de Conexões Node.js (mysql2/promise)</div>
        </div>
      </div>
    </div>
  );
};
