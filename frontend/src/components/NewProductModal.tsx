import React, { useState } from 'react';
import { Modal } from './Modal';
import { Produto } from '../types';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (produto: Produto) => Promise<void>;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Produto>({
    nome: '',
    categoria: 'Vestidos',
    tamanho: 'P, M, G',
    cor: '',
    preco_venda: 389.00,
    estoque_atual: 5,
    imagem_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    descricao: '',
    em_destaque: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || formData.preco_venda <= 0) {
      setError('Por favor, informe o nome e o preço da peça.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
      setFormData({
        nome: '',
        categoria: 'Vestidos',
        tamanho: 'P, M, G',
        cor: '',
        preco_venda: 389.00,
        estoque_atual: 5,
        imagem_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
        descricao: '',
        em_destaque: true
      });
    } catch (err) {
      setError('Erro ao cadastrar peça no catálogo.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12.5px',
    fontWeight: 600,
    color: 'var(--color-charcoal)',
    marginBottom: '6px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-light)',
    fontSize: '13.5px',
    color: 'var(--color-charcoal)',
    backgroundColor: 'var(--bg-surface)',
    outline: 'none',
    transition: 'var(--transition-fast)'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Nova Peça"
      subtitle="Adicionar roupa ou acessório ao acervo da boutique"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'var(--color-terracotta-light)',
            color: 'var(--color-terracotta)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        <div>
          <label style={labelStyle}>Nome da Peça *</label>
          <input
            type="text"
            required
            placeholder="Ex: Vestido Midi Crepe de Seda"
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Categoria *</label>
            <select
              value={formData.categoria}
              onChange={e => setFormData({ ...formData, categoria: e.target.value })}
              style={inputStyle}
            >
              <option value="Vestidos">Vestidos</option>
              <option value="Alfaiataria">Alfaiataria (Blazers / Pantalonas)</option>
              <option value="Blusas & Camisas">Blusas & Camisas de Seda</option>
              <option value="Saias & Shorts">Saias & Shorts</option>
              <option value="Acessórios">Acessórios</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tamanhos Disponíveis</label>
            <input
              type="text"
              placeholder="Ex: P, M, G ou 38, 40"
              value={formData.tamanho}
              onChange={e => setFormData({ ...formData, tamanho: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Cor / Tom</label>
            <input
              type="text"
              placeholder="Ex: Off-White, Champagne"
              value={formData.cor}
              onChange={e => setFormData({ ...formData, cor: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Preço de Venda (R$) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.preco_venda}
              onChange={e => setFormData({ ...formData, preco_venda: parseFloat(e.target.value) || 0 })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Estoque Inicial</label>
            <input
              type="number"
              min="0"
              value={formData.estoque_atual}
              onChange={e => setFormData({ ...formData, estoque_atual: parseInt(e.target.value) || 0 })}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>URL da Fotografia / Lookbook</label>
          <input
            type="url"
            placeholder="https://..."
            value={formData.imagem_url}
            onChange={e => setFormData({ ...formData, imagem_url: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Descrição Editorial e Composição</label>
          <textarea
            rows={3}
            placeholder="Tecido, modelagem, caimento, forro e sugestões de styling..."
            value={formData.descricao}
            onChange={e => setFormData({ ...formData, descricao: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="destaque"
            checked={formData.em_destaque}
            onChange={e => setFormData({ ...formData, em_destaque: e.target.checked })}
          />
          <label htmlFor="destaque" style={{ fontSize: '13px', color: 'var(--color-charcoal)' }}>
            Exibir em destaque na vitrine da Área da Cliente
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              backgroundColor: 'var(--color-sand-light)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              color: 'var(--color-charcoal)',
              fontWeight: 500
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 22px',
              backgroundColor: 'var(--color-noir)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {loading ? 'Salvando...' : 'Adicionar ao Catálogo'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
