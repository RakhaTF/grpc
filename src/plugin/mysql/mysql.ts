import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: (process.env.DB_IDENTIFIER as "mysql") || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "tokopaedi",
    migrationsRun: false,
    timezone: "+07:00",
    logging: true,
    logger: "file",
})