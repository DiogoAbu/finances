import './helpers/dotenv';

import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import debug from './helpers/debug';
import sigkill from './helpers/sigkill';
import resolvers from './resolver';
import typeDefs from './schema/user';

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers } as any]),
});

sigkill(() => server.stop());

(async (): Promise<void> => {
  const { url } = await server.listen(process.env.PORT);

  debug('ready at %s', url);
})();
