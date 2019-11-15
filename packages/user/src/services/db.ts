import { Container } from 'typedi';
import { useContainer as setContainer, createConnection } from 'typeorm';

import { entities } from '../entities';

// register 3rd party IOC container
setContainer(Container);

const { NODE_ENV, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const isDev = NODE_ENV !== 'production';

export default async () => {
  return createConnection({
    type: 'postgres',
    host: isDev ? 'localhost' : 'database',
    port: 5432,
    database: POSTGRES_DB || 'finances',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'senha123',
    // When sync is true data that use columns that were removed will be dropped,
    // leading to the loss of data.
    synchronize: true,
    logging: isDev ? 'all' : ['error'],
    dropSchema: isDev,
    cache: true,
    entities,
  });
};
