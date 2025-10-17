-- =====================================================
-- Seed para a tabela: usuario
-- =====================================================
INSERT INTO usuario (nome, email, senha, tipo_usuario)
VALUES
('Admin Teste', 'admin@arsense.com', '$2a$10$7Q9z5H9F9wKJ3p7h6k1E9O0Tqf8PqJr6lHkBvT9ZxY6mQ9f', 'admin'), 
('João Silva', 'joao@arsense.com', '$2a$10$QWERTYUIOPASDFGHJKLZXCVBNM1234567890abcdEFGH', 'comum');

-- =====================================================
-- Seed para a tabela: dispositivo
-- =====================================================
INSERT INTO dispositivo (nome, mac, localizacao, status)
VALUES
('Sensor Entrada', '00:1A:C2:7B:00:47', 'Entrada Principal', 'ativo'),
('Sensor Almoxarifado', '00:1A:C2:7B:00:48', 'Almoxarifado', 'ativo');

-- =====================================================
-- Seed para a tabela: leitura
-- =====================================================
INSERT INTO leitura (id_dispositivo, dados, status_alerta)
VALUES
(1, '{"co": 5, "ch4": 2}', 'normal'),
(2, '{"co": 50, "ch4": 10}', 'atencao');
