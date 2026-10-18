import streamlit as st
import mysql.connector
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Boutique CRM - Teste", layout="wide")

# Função de conexão com o MySQL
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="Ya998432202@",
        database="boutique_crm",
        auth_plugin='mysql_native_password'
    )

st.title("🛍️ Painel de Teste - Boutique CRM")

# Teste de Conectividade
try:
    conn = get_connection()
    st.success("Conexão com o banco MySQL realizada com sucesso!")
except Exception as e:
    st.error(f"Erro ao conectar ao banco de dados: {e}")
    st.stop()

# 1. Métricas Rápidas
col1, col2, col3 = st.columns(3)

df_clientes = pd.read_sql("SELECT COUNT(*) AS total FROM clientes", conn)
df_vendas = pd.read_sql("SELECT SUM(valor_total) AS faturamento, COUNT(*) AS total_vendas FROM vendas", conn)

faturamento = df_vendas['faturamento'].iloc[0] or 0.0
total_vendas = df_vendas['total_vendas'].iloc[0] or 0
total_clientes = df_clientes['total'].iloc[0] or 0

col1.metric("Total de Clientes", total_clientes)
col2.metric("Total de Vendas", total_vendas)
col3.metric("Faturamento Acumulado", f"R$ {faturamento:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."))

st.divider()

# 2. Visualização das Tabelas e Pipeline
aba1, aba2, aba3, aba4 = st.tabs(["Pipeline de Clientes", "Peças em Estoque", "Gráficos", "Novo Cadastro"])

with aba1:
    st.subheader("Pipeline de Atendimento")
    query_pipeline = """
        SELECT c.nome, c.telefone, p.etapa, p.anotacoes, p.data_ultimo_contato 
        FROM pipeline_atendimentos p
        JOIN clientes c ON p.cliente_id = c.id
    """
    df_pipe = pd.read_sql(query_pipeline, conn)
    st.dataframe(df_pipe, use_container_width=True)

with aba2:
    st.subheader("Catálogo de Produtos")
    df_produtos = pd.read_sql("SELECT nome, categoria, tamanho, cor, preco_venda, estoque_atual FROM produtos", conn)
    st.dataframe(df_produtos, use_container_width=True)

with aba3:
    st.subheader("Distribuição do Pipeline")
    if not df_pipe.empty:
        fig = px.pie(df_pipe, names="etapa", title="Clientes por Etapa do Pipeline", hole=0.4)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("Nenhum dado no pipeline para exibir gráfico.")

with aba4:
    st.subheader("Cadastrar Nova Cliente")
    
    # st.form agrupa os campos para não recarregar a página a cada letra digitada
    with st.form(key="form_novo_cliente", clear_on_submit=True):
        
        # Dividindo em duas colunas para ficar visualmente organizado
        col_a, col_b = st.columns(2)
        
        with col_a:
            novo_nome = st.text_input("Nome Completo *")
            novo_telefone = st.text_input("Telefone (WhatsApp) *")
            novo_email = st.text_input("E-mail")
            nova_data = st.date_input("Data de Nascimento")
        
        with col_b:
            novo_tam_sup = st.selectbox("Tamanho Superior", ["", "PP", "P", "M", "G", "GG", "XG"])
            novo_tam_inf = st.selectbox("Tamanho Inferior", ["", "34", "36", "38", "40", "42", "44", "46", "48"])
            novo_calcado = st.selectbox("Tamanho Calçado", ["", "34", "35", "36", "37", "38", "39", "40"])
            novo_estilo = st.selectbox("Estilo Preferido", ["", "Casual", "Elegante", "Romântico", "Criativo", "Clássico", "Esportivo"])
        
        # Botão para enviar
        submit_button = st.form_submit_button(label="💾 Salvar Cadastro")
        
        # Lógica quando a sua mãe clicar em "Salvar"
        if submit_button:
            # Validação básica
            if novo_nome == "" or novo_telefone == "":
                st.warning("⚠️ Por favor, preencha pelo menos o Nome e o Telefone!")
            else:
                try:
                    cursor = conn.cursor()
                    # Comando SQL para inserir os dados que vieram dos campos acima
                    query_insert = """
                    INSERT INTO clientes 
                    (nome, telefone, email, data_nascimento, tamanho_superior, tamanho_inferior, tamanho_calcado, estilo_preferido) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    valores = (novo_nome, novo_telefone, novo_email, nova_data, novo_tam_sup, novo_tam_inf, novo_calcado, novo_estilo)
                    
                    cursor.execute(query_insert, valores)
                    conn.commit() # Confirma a gravação no banco
                    
                    st.success(f"✅ Cliente {novo_nome} cadastrada com sucesso! Atualize a página (F5) para ver na contagem.")
                    
                except Exception as e:
                    st.error(f"Erro ao salvar no banco: {e}")
conn.close()