"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.AppDataSource = void 0;
const dotenv = require('dotenv-override');
dotenv.config({ override: true }); // load .env variables
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: '+00:00',
    entities: [(0, path_1.join)(__dirname, 'entities', '*.{ts,js}')],
    logging: false,
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    migrations: [(0, path_1.join)(__dirname, 'migrations', '*.{ts,js}')],
    ssl: process.env.NODE_ENV === 'development'
        ? false
        : {
            require: true,
            rejectUnauthorized: false,
        },
});
const dbConnection = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('Conectado a la DB :)');
        return exports.AppDataSource;
    }
    catch (error) {
        console.log('error en la base de datos', error);
    }
};
exports.dbConnection = dbConnection;
