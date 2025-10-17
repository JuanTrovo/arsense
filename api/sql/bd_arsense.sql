CREATE DATABASE IF NOT EXISTS bd_arsense;

USE bd_arsense;

DROP TABLE IF EXISTS leitura;

DROP TABLE IF EXISTS dispositivo;

DROP TABLE IF EXISTS usuario;

-- =====================================================
-- Tabela: usuario
-- =====================================================
CREATE TABLE `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `tipo_usuario` ENUM('admin','tecnico','comum') DEFAULT 'comum',
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =====================================================
-- Tabela: dispositivo
-- =====================================================
CREATE TABLE `dispositivo` (
  `mac` BINARY(6) PRIMARY KEY,
  `id_usuario` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `localizacao` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('ativo','inativo') DEFAULT 'ativo',
  `data_instalacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_dispositivo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =====================================================
-- Tabela: leitura
-- =====================================================
CREATE TABLE `leitura` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `dispositivo` BINARY(6) NOT NULL,
  `dados` JSON NOT NULL,
  `status_alerta` ENUM('normal','atencao','critico') DEFAULT 'normal',
  `data_hora` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_leitura_dispositivo` FOREIGN KEY (`dispositivo`) REFERENCES `dispositivo`(`mac`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

