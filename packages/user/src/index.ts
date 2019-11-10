import 'reflect-metadata';
import './services/dotenv';

import { ApolloServer } from 'apollo-server';

import { User, resolveUserReference } from './entities/User/User';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import UserResolver from './entities/User/User.resolver';
import debug from './services/debug';
import db from './services/db';
import sigkill from './services/sigkill';

(async () => {
  try {
    await db();

    // Define schema
    const schema = await buildFederatedSchema(
      {
        resolvers: [UserResolver],
        orphanedTypes: [User],
        validate: false,
      },
      {
        User: { __resolveReference: resolveUserReference },
      },
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
