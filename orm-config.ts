import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { config } from 'dotenv';

config({
    path: '.env'
})

let connectionOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/models/*/*{.entity.js,.entity.ts}'],
    migrations: ['./migration/*.js'],
};

export default new DataSource({
  ...connectionOptions,
});