# 🛍️ AURA BOUTIQUE — Haute Couture & CRM

Sistema moderno de gestão e relacionamento para **boutique de moda feminina**, desenvolvido com arquitetura profissional **React (TypeScript + Vite) no frontend**, **Node.js (TypeScript + Express) no backend** e **MySQL 8.0 no banco de dados**.

---

## 🏛️ Arquitetura do Projeto

O repositório está organizado como um monorepo limpo e desacoplado:

```
crm-boutique/
├── database/                   # Scripts SQL e modelo de dados
│   ├── schema.sql              # DDL: criação de tabelas e relacionamentos
│   └── seed.sql                # DML: dados demonstrativos iniciais ricos
├── backend/                    # API REST em Node.js + TypeScript + Express
│   ├── src/
│   │   ├── config/             # Configuração e pool de conexão com MySQL
│   │   ├── controllers/        # Controladores de clientes, produtos, vendas e pipeline
│   │   ├── data/               # Dados demonstrativos de fallback gracioso
│   │   ├── routes/             # Rotas da API REST
│   │   ├── types/              # Definições de tipos TypeScript
│   │   └── server.ts           # Inicialização do Express e middlewares
│   ├── .env.example            # Modelo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Aplicação Web em React + TypeScript + Vite
│   ├── src/
│   │   ├── components/         # Sidebar, Header, Modais e Cards
│   │   ├── pages/              # Painel ADM e Área da Cliente
│   │   ├── services/           # Cliente HTTP da API REST
│   │   ├── styles/             # Design System de Luxo & Tokens CSS
│   │   └── types/              # Tipagens da interface
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml          # Container MySQL 8.0 pronto para uso
└── package.json                # Scripts centralizados de execução
```

---

## 🎨 Identidade Visual e Estilo Editorial

A interface foi desenhada seguindo referências de **alta costura, minimalismo refinado e sofisticação**:
- **Cores**: Paleta nobre composta por *Noir* (`#181615`), *Champagne & Ouro Envelhecido* (`#B8976C`), *Off-White* (`#FAF8F5`) e toques sutis de *Terracota* (`#A65D46`).
- **Tipografia**: Combinação editorial refinada da clássica *Cormorant Garamond* nos títulos e *Plus Jakarta Sans* para clareza e usabilidade na leitura de dados.
- **Espaçamento e Componentes**: Sem poluição visual, sombras exageradas ou gradientes berrantes. Cards com bordas ultrafinas de 1px e fotografias em alta resolução de moda feminina.

---

## 🚀 Como Executar o Projeto

### 1. Iniciar o Banco de Dados MySQL (Docker)

O container MySQL já está configurado no [`docker-compose.yml`](docker-compose.yml):

```bash
# Na raiz do projeto:
docker compose up -d
```
*(O banco inicializa na porta `3306` com a base `boutique_crm`).*

Para carregar o schema e os dados demonstrativos no MySQL:
```bash
docker exec -i boutique_mysql mysql -uroot -pYa998432202@ < database/schema.sql
docker exec -i boutique_mysql mysql -uroot -pYa998432202@ < database/seed.sql
```

---

### 2. Iniciar o Backend (API REST Node.js)

```bash
# Opção 1: a partir da raiz
npm run dev:backend

# Opção 2: dentro da pasta backend
cd backend
npm install
npm run dev
```

A API estará acessível em: **`http://localhost:3001/api`**  
*(Ex: `http://localhost:3001/api/clients`, `http://localhost:3001/api/products`, `http://localhost:3001/api/dashboard/metrics`)*

---

### 3. Iniciar o Frontend (React + Vite)

Em outro terminal:

```bash
# Opção 1: a partir da raiz
npm run dev:frontend

# Opção 2: dentro da pasta frontend
cd frontend
npm install
npm run dev
```

O painel abrirá automaticamente em: **`http://localhost:5173`**

---

## 📋 Escopo Entregue Nesta Etapa

| Seção / Módulo | Descrição | Status |
| :--- | :--- | :---: |
| **Painel ADM - Visão Geral** | KPIs (Clientes, Peças, Faturamento, Pós-Venda), gráfico de barras de vendas e lista de atividades recentes | ✅ Concluído |
| **Gestão de Clientes** | Tabela refinada com busca em tempo real, filtro por estilo, tamanhos de vestuário e atalho WhatsApp | ✅ Concluído |
| **Cadastro de Clientes** | Modal completo com ficha de medidas da cliente (superior, inferior, calçado, estilo e notas de consultoria) | ✅ Concluído |
| **Ficha da Cliente** | Modal de visualização rápida com medidas, histórico e botão direto para WhatsApp | ✅ Concluído |
| **Catálogo de Peças** | Lookbook visual com fotos reais de moda feminina, categorias, tamanhos, preço em BRL e badges de estoque | ✅ Concluído |
| **Cadastro de Peça** | Modal para adicionar nova peça ao catálogo com categoria, tamanhos, preço e estoque | ✅ Concluído |
| **Histórico de Compras** | Registro detalhado de compras, formas de pagamento, faturamento total e ticket médio | ✅ Concluído |
| **Pipeline & Pós-Venda** | Funil visual por etapas (*Nova Cliente*, *Em Atendimento*, *Mala em Casa*, *Aguardando Pagto.*, *Pós-Venda*, *Inativa*) | ✅ Concluído |
| **Área da Cliente** | Storefront público da boutique com Hero da coleção, curadoria de peças, detalhes e solicitação via WhatsApp | ✅ Concluído |
| **Alternador de Visão** | Botão no header e sidebar para alternar facilmente entre o *Painel ADM* e a *Área da Cliente* | ✅ Concluído |
| **Relatórios & Configurações** | Páginas estruturadas com indicação explícita de demonstração analítica | ✅ Concluído |
| **Fallback Resiliente** | Backend e Frontend contam com dados demonstrativos caso o banco esteja em manutenção | ✅ Concluído |

---

## 🔮 Funcionalidades Preparadas para as Próximas Etapas

- [ ] Autenticação de usuários (JWT) e controle de permissões por consultora
- [ ] Upload direto de imagens de peças para CDN/S3
- [ ] Integração com gateway de pagamentos (PIX / Cartão com split)
- [ ] Automações de disparo de mensagens de pós-venda e aniversário via WhatsApp Business API
- [ ] Histórico detalhado de provas do serviço *Mala em Casa*
