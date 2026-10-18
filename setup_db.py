import mysql.connector

def preparar_banco():
    # Conecta no MySQL (coloque sua senha do Docker aqui)
    conn = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="12345678" 
    )
    cursor = conn.cursor()

    # O script SQL completo (criação e inserção)
    comandos_sql = """
    CREATE DATABASE IF NOT EXISTS boutique_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    USE boutique_crm;

    CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        data_nascimento DATE,
        tamanho_superior VARCHAR(10),
        tamanho_inferior VARCHAR(10),
        tamanho_calcado VARCHAR(5),
        estilo_preferido VARCHAR(100),
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        tamanho VARCHAR(10) NOT NULL,
        cor VARCHAR(50),
        preco_venda DECIMAL(10, 2) NOT NULL,
        estoque_atual INT DEFAULT 0,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS vendas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT NOT NULL,
        data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
        valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        forma_pagamento ENUM('PIX', 'Cartao_Credito', 'Cartao_Debito', 'Dinheiro') DEFAULT 'PIX'
    );

    CREATE TABLE IF NOT EXISTS pipeline_atendimentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT NOT NULL,
        etapa ENUM('Nova Cliente', 'Em Atendimento', 'Mala em Casa', 'Aguardando Pagamento', 'Pos-Venda', 'Inativa') DEFAULT 'Nova Cliente',
        anotacoes TEXT,
        data_ultimo_contato DATE,
        data_retorno DATE
    );

    -- Limpa os dados se já existirem para não duplicar no teste
    TRUNCATE TABLE pipeline_atendimentos;
    TRUNCATE TABLE vendas;
    TRUNCATE TABLE produtos;
    TRUNCATE TABLE clientes;

    -- Insere os dados de teste
    INSERT INTO clientes (nome, telefone, data_nascimento, tamanho_superior, tamanho_inferior, estilo_preferido) VALUES
    ('Mariana Silva', '11988887777', '1995-04-12', 'M', '38', 'Casual Elegante'),
    ('Beatriz Costa', '11977776666', '1990-09-28', 'P', '36', 'Romântico'),
    ('Juliana Mendes', '11966665555', '1988-12-05', 'G', '42', 'Elegante');

    INSERT INTO produtos (nome, categoria, tamanho, cor, preco_venda, estoque_atual) VALUES
    ('Vestido Midi Floral', 'Vestido', 'M', 'Azul', 249.90, 8),
    ('Calça Pantalona Alfaiataria', 'Calça', '38', 'Areia', 189.90, 5),
    ('Blusa Seda Off-White', 'Blusa', 'P', 'Off-White', 129.90, 12),
    ('Cinto Couro Fivela Dourada', 'Acessório', 'Único', 'Caramelo', 79.90, 15);

    INSERT INTO vendas (cliente_id, data_venda, valor_total, forma_pagamento) VALUES
    (1, '2026-08-10 14:30:00', 379.80, 'PIX'),
    (2, '2026-08-15 16:45:00', 249.90, 'Cartao_Credito');

    INSERT INTO pipeline_atendimentos (cliente_id, etapa, anotacoes, data_ultimo_contato) VALUES
    (1, 'Pos-Venda', 'Mandou mensagem elogiando a calça pantalona.', '2026-08-11'),
    (2, 'Em Atendimento', 'Interessada na nova coleção de primavera.', '2026-08-20'),
    (3, 'Inativa', 'Sem contato há mais de 60 dias.', '2026-06-15');
    """

    # Executa cada comando separadamente
    for resultado in cursor.execute(comandos_sql, multi=True):
        pass

    conn.commit()
    cursor.close()
    conn.close()
    print("Banco de dados criado e dados de teste inseridos com sucesso!")

if __name__ == "__main__":
    preparar_banco()