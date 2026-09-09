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
aba1, aba2, aba3 = st.tabs(["Pipeline de Clientes", "Peças em Estoque", "Gráficos"])

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

conn.close()