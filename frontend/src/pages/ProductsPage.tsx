import React, { useState } from 'react';
import { Search, Filter, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { Produto } from '../types';

interface ProductsPageProps {
  produtos: Produto[];
  onNewProduct: () => void;
  isDemoData: boolean;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  produtos,
  onNewProduct,
  isDemoData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todas');

  const categorias = [
    'Todas',
    'Vestidos',
    'Alfaiataria',
    'Blusas & Camisas',
    'Saias & Shorts',
    'Acessórios'
  ];

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch =
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (produto.descricao && produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (produto.cor && produto.cor.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategoria = selectedCategoria === 'Todas' || produto.categoria === selectedCategoria;

    return matchesSearch && matchesCategoria;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar com Busca, Filtro e Cadastro */}
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
          {/* Campo de Busca */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: 'var(--bg-body)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            flex: 1,
            maxWidth: '380px'
          }}>
            <Search size={16} color="var(--color-warm-gray)" />
            <input
              type="text"
              placeholder="Buscar por peça, cor ou tecido..."
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

          {/* Filtro por Categoria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} color="var(--color-warm-gray)" />
            <select
              value={selectedCategoria}
              onChange={e => setSelectedCategoria(e.target.value)}
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
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onNewProduct}
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
          <span>Cadastrar Peça</span>
        </button>
      </div>

      {/* Grid de Roupas / Lookbook da Boutique */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '24px'
      }}>
        {filteredProdutos.map(produto => {
          const isLowStock = produto.estoque_atual > 0 && produto.estoque_atual <= 4;
          const isOutOfStock = produto.estoque_atual === 0;

          return (
            <div
              key={produto.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            >
              {/* Imagem Editorial */}
              <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', backgroundColor: 'var(--color-sand-light)' }}>
                <img
                  src={produto.imagem_url || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'}
                  alt={produto.nome}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Badge de Destaque / Categoria */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: 'rgba(24, 22, 21, 0.8)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 500,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.04em'
                  }}>
                    {produto.categoria}
                  </span>
                  {produto.em_destaque && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: 'var(--color-gold)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Sparkles size={11} />
                      <span>Destaque</span>
                    </span>
                  )}
                </div>

                {/* Badge de Estoque */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                  {isOutOfStock ? (
                    <span style={{ padding: '3px 8px', backgroundColor: 'var(--color-terracotta)', color: '#FFFFFF', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-xs)' }}>
                      Esgotado
                    </span>
                  ) : isLowStock ? (
                    <span style={{ padding: '3px 8px', backgroundColor: '#FBBF24', color: '#181615', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-xs)' }}>
                      Apenas {produto.estoque_atual} un.
                    </span>
                  ) : (
                    <span style={{ padding: '3px 8px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--color-noir)', fontSize: '11px', fontWeight: 600, borderRadius: 'var(--radius-xs)' }}>
                      {produto.estoque_atual} em estoque
                    </span>
                  )}
                </div>
              </div>

              {/* Informações da Peça */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    color: 'var(--color-noir)',
                    marginBottom: '4px'
                  }}>
                    {produto.nome}
                  </h4>
                  <p style={{
                    fontSize: '12.5px',
                    color: 'var(--color-warm-gray)',
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {produto.descricao || 'Peça confeccionada com acabamento de alfaiataria fina.'}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-warm-gray)', textTransform: 'uppercase' }}>
                      Tamanhos: {produto.tamanho}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-noir)' }}>
                      {produto.preco_venda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '12px',
                    color: 'var(--color-gold-hover)',
                    fontWeight: 600
                  }}>
                    {produto.cor || 'Neutro'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
