CREATE DATABASE IF NOT EXISTS bd_arsense;
USE bd_arsense;

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
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `mac` VARCHAR(50) NOT NULL UNIQUE,
  `localizacao` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('ativo','inativo') DEFAULT 'ativo',
  `data_instalacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_dispositivo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =====================================================
-- Tabela: leitura
-- =====================================================
CREATE TABLE `leitura` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_dispositivo` INT NOT NULL,
  `dados` JSON NOT NULL,
  `status_alerta` ENUM('normal','atencao','critico') DEFAULT 'normal',
  `data_hora` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_leitura_dispositivo` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivo`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
