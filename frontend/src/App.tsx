import React, { useState, useEffect } from 'react';
import { Sidebar, NavItem } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProductsPage } from './pages/ProductsPage';
import { SalesHistoryPage } from './pages/SalesHistoryPage';
import { RelationshipPage } from './pages/RelationshipPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ClientStorefrontPage } from './pages/ClientStorefrontPage';
import { NewClientModal } from './components/NewClientModal';
import { NewProductModal } from './components/NewProductModal';
import { ClientDetailsModal } from './components/ClientDetailsModal';
import { api } from './services/api';
import { Cliente, Produto, Venda, PipelineItem, DashboardMetrics } from './types';
import './styles/tokens.css';

export const App: React.FC = () => {
  // Visualização: 'admin' ou 'storefront' (Área da Cliente)
  const [viewMode, setViewMode] = useState<'admin' | 'storefront'>('admin');
  const [currentTab, setCurrentTab] = useState<NavItem>('overview');

  // Dados do Sistema
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [pipeline, setPipeline] = useState<PipelineItem[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClientes: 0,
    totalProdutos: 0,
    totalPecasEstoque: 0,
    totalVendas: 0,
    faturamentoTotal: 0,
    clientesPrecisaAtencao: 0
  });

  const [isDemoData, setIsDemoData] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modais
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [selectedClientForDetails, setSelectedClientForDetails] = useState<Cliente | null>(null);

  // Carrega dados iniciais
  const loadAllData = async () => {
    try {
      const [cliRes, prodRes, salesRes, pipeRes, metricRes] = await Promise.all([
        api.getClients(),
        api.getProducts(),
        api.getSales(),
        api.getPipeline(),
        api.getMetrics()
      ]);

      setClientes(cliRes.data);
      setProdutos(prodRes.data);
      setVendas(salesRes.data);
      setPipeline(pipeRes.data);
      setMetrics(metricRes.data);
      setIsDemoData(cliRes.isDemo || prodRes.isDemo);
    } catch (e) {
      console.warn('Erro ao carregar dados:', e);
      setIsDemoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers para salvar novos cadastros
  const handleSaveClient = async (novoCliente: Cliente) => {
    await api.createClient(novoCliente);
    await loadAllData();
  };

  const handleSaveProduct = async (novoProduto: Produto) => {
    await api.createProduct(novoProduto);
    await loadAllData();
  };

  const handleUpdatePipelineStage = async (id: number, etapa: string) => {
    await api.updatePipelineStage(id, etapa);
    setPipeline(prev =>
      prev.map(item => (item.id === id ? { ...item, etapa: etapa as any } : item))
    );
  };

  // Se o usuário selecionou ver a Área da Cliente
  if (viewMode === 'storefront') {
    return (
      <ClientStorefrontPage
        produtos={produtos}
        onBackToAdmin={() => setViewMode('admin')}
      />
    );
  }

  // Título da aba atual
  const tabTitles: Record<NavItem, { title: string; subtitle: string }> = {
    overview: { title: 'Visão Geral', subtitle: 'Métricas, faturamento e resumo de atividades' },
    clients: { title: 'Gestão de Clientes', subtitle: 'Fichas de medidas, estilo e preferências' },
    products: { title: 'Acervo de Peças', subtitle: 'Catálogo de roupas, tecidos e disponibilidade' },
    sales: { title: 'Histórico de Compras', subtitle: 'Registro de transações e formas de pagamento' },
    relationship: { title: 'Relacionamento & Pós-Venda', subtitle: 'Pipeline de atendimento, retorno e mala em casa' },
    reports: { title: 'Relatórios Analíticos', subtitle: 'Indicadores de desempenho e comportamento' },
    settings: { title: 'Configurações', subtitle: 'Parâmetros da boutique e status do banco' }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
      {/* Sidebar de Navegação */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenStorefront={() => setViewMode('storefront')}
        isBackendConnected={!isDemoData}
      />

      {/* Conteúdo Principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header Superior */}
        <Header
          title={tabTitles[currentTab].title}
          subtitle={tabTitles[currentTab].subtitle}
          onNewClient={() => setIsNewClientOpen(true)}
          onNewProduct={() => setIsNewProductOpen(true)}
          onOpenStorefront={() => setViewMode('storefront')}
        />

        {/* View da Aba Ativa */}
        <main style={{ padding: '36px', flex: 1 }}>
          {currentTab === 'overview' && (
            <DashboardPage
              metrics={metrics}
              recentClients={clientes}
              recentProducts={produtos}
              recentSales={vendas}
              isDemoData={isDemoData}
              onNavigate={setCurrentTab}
              onNewClient={() => setIsNewClientOpen(true)}
              onNewProduct={() => setIsNewProductOpen(true)}
              onSelectClient={setSelectedClientForDetails}
            />
          )}

          {currentTab === 'clients' && (
            <ClientsPage
              clientes={clientes}
              onNewClient={() => setIsNewClientOpen(true)}
              onSelectClient={setSelectedClientForDetails}
              isDemoData={isDemoData}
            />
          )}

          {currentTab === 'products' && (
            <ProductsPage
              produtos={produtos}
              onNewProduct={() => setIsNewProductOpen(true)}
              isDemoData={isDemoData}
            />
          )}

          {currentTab === 'sales' && (
            <SalesHistoryPage
              vendas={vendas}
              isDemoData={isDemoData}
            />
          )}

          {currentTab === 'relationship' && (
            <RelationshipPage
              pipeline={pipeline}
              onUpdateStage={handleUpdatePipelineStage}
              isDemoData={isDemoData}
            />
          )}

          {currentTab === 'reports' && <ReportsPage />}

          {currentTab === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Modais Globais */}
      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
        onSave={handleSaveClient}
      />

      <NewProductModal
        isOpen={isNewProductOpen}
        onClose={() => setIsNewProductOpen(false)}
        onSave={handleSaveProduct}
      />

      <ClientDetailsModal
        cliente={selectedClientForDetails}
        isOpen={!!selectedClientForDetails}
        onClose={() => setSelectedClientForDetails(null)}
      />
    </div>
  );
};

export default App;
