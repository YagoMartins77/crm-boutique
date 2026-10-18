-- ========================================================
-- BOUTIQUE CRM - DADOS INICIAIS DEMONSTRATIVOS (SEED)
-- ========================================================

USE boutique_crm;

-- Desabilita checagem de chave estrangeira para limpeza
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE itens_venda;
TRUNCATE TABLE vendas;
TRUNCATE TABLE pipeline_atendimentos;
TRUNCATE TABLE produtos;
TRUNCATE TABLE categorias;
TRUNCATE TABLE clientes;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Categorias
INSERT INTO categorias (nome, descricao) VALUES
('Vestidos', 'Vestidos midi, longos e casuais de alfaiataria e seda'),
('Alfaiataria', 'Blazers, pantalonas e coletes estruturados'),
('Blusas & Camisas', 'Camisas de seda pura, linho e tricot premium'),
('Saias & Shorts', 'Saias lápis, evasê e bermudas em crepe'),
('Acessórios', 'Cintos em couro nobre, lenços de seda e clutches');

-- 2. Clientes
INSERT INTO clientes (id, nome, telefone, email, data_nascimento, tamanho_superior, tamanho_inferior, tamanho_calcado, estilo_preferido, observacoes) VALUES
(1, 'Mariana Silva Alencar', '11988887777', 'mariana.alencar@email.com', '1992-04-12', 'M', '38', '37', 'Casual Elegante', 'Prefere tons terrosos e tecidos naturais como linho e seda. Ama o serviço de mala em casa.'),
(2, 'Beatriz Costa Prado', '11977776666', 'beatriz.prado@email.com', '1990-09-28', 'P', '36', '36', 'Romântico Moderno', 'Adora vestidos florais fluidos e decotes discretos. Sensível ao caimento dos ombros.'),
(3, 'Juliana Mendes Carvalho', '11966665555', 'juliana.mendes@email.com', '1985-12-05', 'G', '42', '39', 'Alfaiataria Clássica', 'Advogada, compra prioritariamente terninhos e camisas sociais estruturadas.'),
(4, 'Camila Rocha Fontes', '11955554444', 'camila.fontes@email.com', '1996-07-19', 'P', '36', '35', 'Minimalista Chic', 'Gosta de peças versáteis monocromáticas: preto, off-white e fendi.'),
(5, 'Helena Albuquerque', '11944443333', 'helena.albuquerque@email.com', '1982-11-03', 'M', '40', '38', 'Elegante Contemporâneo', 'Cliente VIP de compras sazonais. Solicita curadoria antes das viagens de fim de ano.');

-- 3. Produtos / Peças com Imagens de Moda de Alta Resolução
INSERT INTO produtos (id, nome, categoria, tamanho, cor, preco_venda, estoque_atual, imagem_url, descricao, em_destaque) VALUES
(1, 'Vestido Midi Silk Champagne', 'Vestidos', 'M', 'Champagne', 489.90, 6, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', 'Vestido confeccionado em seda acetinada de caimento impecável com fenda lateral sutil.', TRUE),
(2, 'Blazer Alfaiataria Areia Sartorial', 'Alfaiataria', 'P, M, G', 'Areia Natural', 629.00, 4, 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80', 'Blazer estruturado com ombreiras suaves e forro em acetato respirável.', TRUE),
(3, 'Calça Pantalona Crepe Fendi', 'Alfaiataria', '38, 40, 42', 'Fendi', 359.90, 8, 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', 'Pantalona de cintura alta com cós duplo alongado e pregas frontais refinadas.', TRUE),
(4, 'Camisa de Seda Pura Off-White', 'Blusas & Camisas', 'PP, P, M', 'Off-White', 389.00, 10, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 'Camisa clássica com botões em madrepérola natural e punho francês.', TRUE),
(5, 'Vestido Longo Evasê Terracota', 'Vestidos', 'P, M', 'Terracota', 549.90, 5, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', 'Peça fluida com decote nas costas delicado, ideal para coquetéis e ocasiões especiais.', TRUE),
(6, 'Cinto Couro Legítimo Fivela Banhada', 'Acessórios', 'Único', 'Caramelo', 179.90, 14, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'Cinto em couro bovino nobre com fivela orgânica em banho ouro envelhecido.', FALSE),
(7, 'Colete Alfaiataria Linho Rústico', 'Alfaiataria', 'P, M', 'Linho Cru', 299.90, 7, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80', 'Colete contemporâneo perfeito para sobreposições ou usado como peça única.', TRUE),
(8, 'Saia Plissada Metalizada Bronze', 'Saias & Shorts', 'M, G', 'Bronze Suave', 329.00, 3, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80', 'Plissado permanente com cós em elástico acetinado confortável.', FALSE);

-- 4. Vendas
INSERT INTO vendas (id, cliente_id, data_venda, valor_total, forma_pagamento, status, observacoes) VALUES
(1, 1, '2026-10-10 14:30:00', 849.80, 'PIX', 'Concluida', 'Compra na loja após mala em casa aprovada.'),
(2, 2, '2026-10-12 16:45:00', 389.00, 'Cartao_Credito', 'Concluida', 'Pagamento em 3x s/ juros.'),
(3, 3, '2026-10-15 11:20:00', 988.90, 'Cartao_Credito', 'Concluida', 'Blazer e pantalona para audiência.'),
(4, 4, '2026-10-17 18:00:00', 359.90, 'PIX', 'Concluida', 'Retirada expressa na boutique.');

-- 5. Itens da Venda
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 1, 489.90),
(1, 3, 1, 359.90),
(2, 4, 1, 389.00),
(3, 2, 1, 629.00),
(3, 3, 1, 359.90),
(4, 3, 1, 359.90);

-- 6. Pipeline de Relacionamento
INSERT INTO pipeline_atendimentos (cliente_id, etapa, anotacoes, data_ultimo_contato, data_retorno) VALUES
(1, 'Pos-Venda', 'Enviada mensagem sobre cuidados de lavagem da seda champagne. Feedback excelente.', '2026-10-11', '2026-10-25'),
(2, 'Em Atendimento', 'Aguardando chegar a nova coleção de linho puro tamanho P para enviar fotos.', '2026-10-16', '2026-10-22'),
(3, 'Mala em Casa', 'Mala com 5 opções de alfaiataria entregue na residência. Retirada agendada.', '2026-10-17', '2026-10-19'),
(4, 'Aguardando Pagamento', 'Separou vestido terracota para evento no sábado. Link de pagamento enviado.', '2026-10-18', '2026-10-19'),
(5, 'Inativa', 'Sem compras ou interações há mais de 75 dias. Programar contato com convite de preview VIP.', '2026-08-01', '2026-10-24');
