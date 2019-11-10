import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import { entities } from '../entities';

// register 3rd party IOC container
TypeORM.useContainer(Container);

const { NODE_ENV, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const isDev = NODE_ENV !== 'production';

export default async () => {
  return TypeORM.createConnection({
    type: 'postgres',
    host: isDev ? 'localhost' : 'database',
    port: 5432,
    database: POSTGRES_DB || 'finances',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'senha123',
    synchronize: isDev,
    logging: isDev,
    dropSchema: isDev,
    cache: true,
    entities,
  });
};
