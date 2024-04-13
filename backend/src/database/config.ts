import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'express_db',
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  },
};

export default config;
