import dotenv from 'dotenv';
dotenv.config();

// Configuração de desenvolvimento
const developmentConfig = {
    host: "db", // Nome do serviço do Docker
    port: 3306,
    name: "bd_arsense",
    dialect: "mysql",
    user: "arsense_user",
    password: "arsense_password"
};

// Configuração de produção
const productionConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

// Seleção da configuração dependendo do ambiente
export const db = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
