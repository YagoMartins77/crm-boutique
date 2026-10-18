import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  Scissors
} from 'lucide-react';
import { Produto } from '../types';

interface ClientStorefrontPageProps {
  produtos: Produto[];
  onBackToAdmin: () => void;
}

export const ClientStorefrontPage: React.FC<ClientStorefrontPageProps> = ({
  produtos,
  onBackToAdmin
}) => {
  const [selectedCategoria, setSelectedCategoria] = useState('Todas');
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);

  const categorias = ['Todas', 'Vestidos', 'Alfaiataria', 'Blusas & Camisas', 'Saias & Shorts', 'Acessórios'];

  const filteredProdutos = produtos.filter(
    p => selectedCategoria === 'Todas' || p.categoria === selectedCategoria
  );

  const handleWhatsAppInquiry = (produto: Produto) => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse na peça "${produto.nome}" (${produto.preco_venda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) que vi no catálogo da Aura Boutique ✨`
    );
    window.open(`https://wa.me/5511988887777?text=${text}`, '_blank');
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-body)',
      minHeight: '100vh',
      color: 'var(--color-charcoal)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Bar da Boutique com Atalho para o ADM */}
      <div style={{
        backgroundColor: 'var(--color-noir)',
        color: '#FFFFFF',
        padding: '10px 24px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        letterSpacing: '0.04em'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={13} color="var(--color-gold)" />
          <span>Experiência Exclusiva da Cliente — Atelier Aura Boutique</span>
        </div>

        <button
          onClick={onBackToAdmin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: 'var(--radius-full)',
            color: '#FFFFFF',
            fontSize: '11.5px',
            fontWeight: 600,
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
        >
          <ArrowLeft size={13} />
          <span>Voltar ao Painel Administrativo</span>
        </button>
      </div>

      {/* Header Editorial da Boutique */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        padding: '28px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div>
          <span style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'var(--color-gold)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '4px'
          }}>
            Haute Couture & Atelier
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: 400,
            color: 'var(--color-noir)',
            letterSpacing: '0.04em',
            margin: 0
          }}>
            AURA BOUTIQUE
          </h1>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '13.5px', fontWeight: 500 }}>
          <a href="#colecao" style={{ color: 'var(--color-noir)', textDecoration: 'none' }}>Coleção</a>
          <a href="#servicos" style={{ color: 'var(--color-warm-gray)', textDecoration: 'none' }}>Mala em Casa</a>
          <a href="#atelier" style={{ color: 'var(--color-warm-gray)', textDecoration: 'none' }}>O Atelier</a>
          <button
            onClick={() => handleWhatsAppInquiry(produtos[0] || { nome: 'Peças da Coleção', preco_venda: 0, categoria: '', tamanho: '', estoque_atual: 0 })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              backgroundColor: 'var(--color-noir)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-full)',
              fontSize: '12.5px',
              fontWeight: 600
            }}
          >
            <MessageCircle size={14} color="var(--color-gold)" />
            <span>Falar com Consultora</span>
          </button>
        </nav>
      </header>

      {/* Hero Section Editorial */}
      <section style={{
        position: 'relative',
        height: '480px',
        backgroundColor: 'var(--color-noir)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '0 24px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          opacity: 0.38,
          filter: 'grayscale(20%)'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
          <span style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--color-gold)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '16px'
          }}>
            Nova Coleção • 2026
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '52px',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            marginBottom: '18px'
          }}>
            A Elegância Atemporal do Caimento Perfeito
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 300,
            maxWidth: '560px',
            margin: '0 auto 28px auto',
            lineHeight: 1.6
          }}>
            Seda natural, alfaiataria esculpida e uma curadoria pensada para a mulher que aprecia a sofisticação nos mínimos detalhes.
          </p>

          <a
            href="#colecao"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 32px',
              backgroundColor: 'var(--color-gold)',
              color: '#181615',
              textDecoration: 'none',
              borderRadius: 'var(--radius-full)',
              fontSize: '13.5px',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}
          >
            <span>Explorar o Acervo</span>
            <ChevronRight size={15} />
          </a>
        </div>
      </section>

      {/* Diferenciais da Boutique */}
      <section id="servicos" style={{
        backgroundColor: 'var(--color-sand-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '36px 48px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ padding: '10px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <Truck size={20} color="var(--color-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>Mala em Casa</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
                Prove as peças no conforto do seu lar com curadoria da sua consultora.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ padding: '10px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <Scissors size={20} color="var(--color-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>Ajustes de Alfaiataria</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
                Acabamentos refinados e sob medida executados no nosso próprio atelier.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ padding: '10px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <Sparkles size={20} color="var(--color-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)' }}>Consultoria de Estilo</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-warm-gray)', marginTop: '2px' }}>
                Atendimento individualizado para casamentos, viagens e eventos corporativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrine de Produtos */}
      <section id="colecao" style={{ padding: '64px 48px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold)', fontWeight: 600 }}>
            Curadoria Exclusiva
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'var(--color-noir)', margin: '8px 0' }}>
            Peças Selecionadas
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-warm-gray)', maxWidth: '520px', margin: '0 auto' }}>
            Explore os destaques da estação e consulte a disponibilidade de numeração diretamente com a nossa equipe.
          </p>
        </div>

        {/* Filtro por Categorias */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoria(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 500,
                backgroundColor: selectedCategoria === cat ? 'var(--color-noir)' : '#FFFFFF',
                color: selectedCategoria === cat ? '#FFFFFF' : 'var(--color-charcoal)',
                border: '1px solid var(--border-light)',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Roupas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {filteredProdutos.map(produto => (
            <div
              key={produto.id}
              onClick={() => setSelectedProduto(produto)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition-normal)',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              {/* Imagem da Peça */}
              <div style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', backgroundColor: 'var(--color-sand-light)' }}>
                <img
                  src={produto.imagem_url || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'}
                  alt={produto.nome}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(4px)',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-noir)'
                }}>
                  {produto.categoria}
                </span>
              </div>

              {/* Informações da Peça */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', color: 'var(--color-noir)', marginBottom: '6px' }}>
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
                    {produto.descricao || 'Confeccionada com os mais nobres tecidos.'}
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
                    <span style={{ fontSize: '11px', color: 'var(--color-warm-gray)', display: 'block' }}>Tamanhos: {produto.tamanho}</span>
                    <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-noir)' }}>
                      {produto.preco_venda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppInquiry(produto);
                    }}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'var(--color-sand-light)',
                      color: 'var(--color-charcoal)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <MessageCircle size={13} color="var(--color-gold)" />
                    <span>Consultar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Detalhes da Peça para a Cliente */}
      {selectedProduto && (
        <div
          onClick={() => setSelectedProduto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(24, 22, 21, 0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ height: '100%', minHeight: '380px', backgroundColor: 'var(--color-sand-light)' }}>
              <img
                src={selectedProduto.imagem_url || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'}
                alt={selectedProduto.nome}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', fontWeight: 600 }}>
                  {selectedProduto.categoria}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--color-noir)', margin: '6px 0 12px 0' }}>
                  {selectedProduto.nome}
                </h3>
                <p style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-noir)', marginBottom: '16px' }}>
                  {selectedProduto.preco_venda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>

                <p style={{ fontSize: '13.5px', color: 'var(--color-charcoal)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {selectedProduto.descricao || 'Peça estruturada com padrão de alta costura, forro suave e caimento sofisticado.'}
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-warm-gray)', display: 'block', marginBottom: '8px' }}>
                    Tamanhos do Acervo:
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedProduto.tamanho.split(',').map(tam => (
                      <span key={tam} style={{
                        padding: '6px 14px',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '12.5px',
                        fontWeight: 600
                      }}>
                        {tam.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => handleWhatsAppInquiry(selectedProduto)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Solicitar via WhatsApp / Consultora</span>
                </button>

                <button
                  onClick={() => setSelectedProduto(null)}
                  style={{
                    width: '100%',
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-sand-light)',
                    color: 'var(--color-charcoal)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Fechar Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer da Boutique */}
      <footer style={{
        marginTop: 'auto',
        backgroundColor: 'var(--color-noir)',
        color: '#FFFFFF',
        padding: '48px 48px 24px 48px',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', letterSpacing: '0.04em', margin: 0 }}>
            AURA BOUTIQUE
          </h4>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: 0 }}>
            Atelier de Moda Feminina Contemporânea. Atendimento exclusivo sob hora marcada e serviço personalizado de Mala em Casa.
          </p>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '11.5px', color: 'rgba(255,255,255,0.4)' }}>
            <span>© 2026 Aura Boutique. Todos os direitos reservados.</span>
            <button
              onClick={onBackToAdmin}
              style={{ color: 'var(--color-gold)', fontSize: '11.5px', fontWeight: 600 }}
            >
              Acessar Painel ADM
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
