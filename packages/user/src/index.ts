import 'reflect-metadata';
import './services/dotenv';

import { ApolloServer } from 'apollo-server';

import { entities, resolveReferences, resolvers } from './entities';
import buildFederatedSchema from './helpers/buildFederatedSchema';
import db from './services/db';
import debug from './services/debug';
import sigkill from './services/sigkill';

(async () => {
  try {
    await db();

    // Define schema
    const schema = await buildFederatedSchema(
      {
        resolvers: resolvers as any,
        orphanedTypes: entities,
        validate: false,
      },
      resolveReferences,
    );

    // Define server
    const server = new ApolloServer({
      schema,
      tracing: false,
      playground: true,
    });

    // Handle shutdown
    sigkill(() => server.stop());

    // Start server
    const { url } = await server.listen(process.env.PORT);

    debug('ready at %s', url);
  } catch (err) {
    debug(err);
  }
})();
