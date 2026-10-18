import React, { useState } from 'react';
import { Modal } from './Modal';
import { Cliente } from '../types';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: Cliente) => Promise<void>;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Cliente>({
    nome: '',
    telefone: '',
    email: '',
    data_nascimento: '',
    tamanho_superior: 'M',
    tamanho_inferior: '38',
    tamanho_calcado: '37',
    estilo_preferido: 'Casual Elegante',
    observacoes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.telefone.trim()) {
      setError('Por favor, preencha o nome e o telefone da cliente.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        data_nascimento: '',
        tamanho_superior: 'M',
        tamanho_inferior: '38',
        tamanho_calcado: '37',
        estilo_preferido: 'Casual Elegante',
        observacoes: ''
      });
    } catch (err) {
      setError('Erro ao salvar cliente. Tente novamente.');
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
      title="Cadastrar Nova Cliente"
      subtitle="Ficha de medidas e perfil de estilo para curadoria personalizada"
      maxWidth="640px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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

        {/* Informações Básicas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Nome Completo *</label>
            <input
              type="text"
              required
              placeholder="Ex: Beatriz Albuquerque"
              value={formData.nome}
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Telefone / WhatsApp *</label>
            <input
              type="tel"
              required
              placeholder="Ex: 11988887777"
              value={formData.telefone}
              onChange={e => setFormData({ ...formData, telefone: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              placeholder="cliente@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Data de Nascimento</label>
            <input
              type="date"
              value={formData.data_nascimento}
              onChange={e => setFormData({ ...formData, data_nascimento: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Ficha de Tamanhos e Medidas */}
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--color-sand-light)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <span style={{
            display: 'block',
            fontSize: '11.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-warm-gray)',
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            Ficha de Tamanhos da Boutique
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Tam. Superior</label>
              <select
                value={formData.tamanho_superior}
                onChange={e => setFormData({ ...formData, tamanho_superior: e.target.value })}
                style={inputStyle}
              >
                <option value="PP">PP (34)</option>
                <option value="P">P (36)</option>
                <option value="M">M (38/40)</option>
                <option value="G">G (42)</option>
                <option value="GG">GG (44)</option>
                <option value="XG">XG (46+)</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tam. Inferior</label>
              <select
                value={formData.tamanho_inferior}
                onChange={e => setFormData({ ...formData, tamanho_inferior: e.target.value })}
                style={inputStyle}
              >
                <option value="34">34</option>
                <option value="36">36</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="44">44</option>
                <option value="46">46</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Calçado</label>
              <select
                value={formData.tamanho_calcado}
                onChange={e => setFormData({ ...formData, tamanho_calcado: e.target.value })}
                style={inputStyle}
              >
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estilo e Observações */}
        <div>
          <label style={labelStyle}>Estilo Preferido</label>
          <select
            value={formData.estilo_preferido}
            onChange={e => setFormData({ ...formData, estilo_preferido: e.target.value })}
            style={inputStyle}
          >
            <option value="Casual Elegante">Casual Elegante (Linho, Sedas Leves)</option>
            <option value="Alfaiataria Clássica">Alfaiataria Clássica (Blazers, Pantalonas)</option>
            <option value="Romântico Moderno">Romântico Moderno (Vestidos Fluidos, Estampas)</option>
            <option value="Minimalista Chic">Minimalista Chic (Monocromático, Linhas Retas)</option>
            <option value="Elegante Contemporâneo">Elegante Contemporâneo (Moda Festa, Alfaiataria Fina)</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Preferências & Notas da Consultora</label>
          <textarea
            rows={3}
            placeholder="Cores favoritas, preferências de tecido, serviço de mala em casa, etc."
            value={formData.observacoes}
            onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Actions */}
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
            {loading ? 'Salvando...' : 'Salvar Cadastro'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
