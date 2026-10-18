import React, { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail, Sparkles, Eye, MessageCircle } from 'lucide-react';
import { Cliente } from '../types';

interface ClientsPageProps {
  clientes: Cliente[];
  onNewClient: () => void;
  onSelectClient: (cliente: Cliente) => void;
  isDemoData: boolean;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({
  clientes,
  onNewClient,
  onSelectClient,
  isDemoData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstilo, setSelectedEstilo] = useState('Todos');

  const estilos = [
    'Todos',
    'Casual Elegante',
    'Alfaiataria Clássica',
    'Romântico Moderno',
    'Minimalista Chic',
    'Elegante Contemporâneo'
  ];

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm) ||
      (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEstilo = selectedEstilo === 'Todos' || cliente.estilo_preferido === selectedEstilo;

    return matchesSearch && matchesEstilo;
  });

  const handleWhatsApp = (e: React.MouseEvent, telefone: string, nome: string) => {
    e.stopPropagation();
    const cleanPhone = telefone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const message = encodeURIComponent(`Olá, ${nome}! Passando para conversar sobre a curadoria da Aura Boutique ✨`);
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar: Busca, Filtros e Ação de Cadastro */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: 'var(--bg-surface)',
        padding: '20px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          {/* Campo de Busca Visual */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: 'var(--bg-body)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            flex: 1,
            maxWidth: '400px'
          }}>
            <Search size={16} color="var(--color-warm-gray)" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou e-mail..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                fontSize: '13px',
                color: 'var(--color-charcoal)'
              }}
            />
          </div>

          {/* Filtro por Estilo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} color="var(--color-warm-gray)" />
            <select
              value={selectedEstilo}
              onChange={e => setSelectedEstilo(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-body)',
                fontSize: '12.5px',
                color: 'var(--color-charcoal)',
                outline: 'none'
              }}
            >
              {estilos.map(estilo => (
                <option key={estilo} value={estilo}>{estilo}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onNewClient}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: 'var(--color-noir)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-charcoal)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-noir)'}
        >
          <Plus size={16} color="var(--color-gold)" />
          <span>Nova Cliente</span>
        </button>
      </div>

      {/* Tabela de Clientes Sofisticada */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', margin: 0 }}>
            Listagem de Clientes Cadastradas ({filteredClientes.length})
          </h3>
          {isDemoData && (
            <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)' }}>
              * Dados demonstrativos sincronizáveis com MySQL
            </span>
          )}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-sand-light)', borderBottom: '1px solid var(--border-light)', color: 'var(--color-warm-gray)' }}>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contato</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tamanhos (Sup / Inf)</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estilo Preferido</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-warm-gray)' }}>
                    Nenhuma cliente encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredClientes.map(cliente => (
                  <tr
                    key={cliente.id}
                    onClick={() => onSelectClient(cliente)}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-body)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Nome + Avatar Inicial */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-sand)',
                          color: 'var(--color-charcoal)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '13px'
                        }}>
                          {cliente.nome.charAt(0)}
                        </div>
                        <div>
                          <span style={{ display: 'block', fontWeight: 600, color: 'var(--color-noir)' }}>
                            {cliente.nome}
                          </span>
                          <span style={{ fontSize: '11.5px', color: 'var(--color-warm-gray)' }}>
                            ID #{cliente.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Telefone & WhatsApp */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                          <Phone size={13} color="var(--color-warm-gray)" />
                          <span>{cliente.telefone}</span>
                        </div>
                        {cliente.email && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-warm-gray)', fontSize: '11.5px' }}>
                            <Mail size={13} />
                            <span>{cliente.email}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Tamanhos */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          padding: '3px 8px',
                          backgroundColor: 'var(--color-sand-light)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--color-charcoal)'
                        }}>
                          Sup: {cliente.tamanho_superior || '—'}
                        </span>
                        <span style={{
                          padding: '3px 8px',
                          backgroundColor: 'var(--color-sand-light)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--color-charcoal)'
                        }}>
                          Inf: {cliente.tamanho_inferior || '—'}
                        </span>
                      </div>
                    </td>

                    {/* Estilo Preferido */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={13} color="var(--color-gold)" />
                        <span style={{ color: 'var(--color-noir)', fontWeight: 500 }}>
                          {cliente.estilo_preferido || 'Não definido'}
                        </span>
                      </div>
                    </td>

                    {/* Ações */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={(e) => handleWhatsApp(e, cliente.telefone, cliente.nome)}
                          title="Enviar WhatsApp"
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11.5px',
                            fontWeight: 600
                          }}
                        >
                          <MessageCircle size={13} />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          onClick={() => onSelectClient(cliente)}
                          title="Ver Ficha Completa"
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--color-sand-light)',
                            color: 'var(--color-charcoal)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11.5px',
                            fontWeight: 600
                          }}
                        >
                          <Eye size={13} />
                          <span>Detalhes</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
