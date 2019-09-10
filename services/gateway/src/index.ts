import './helpers/dotenv';

import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

import debug from './helpers/debug';
import sigkill from './helpers/sigkill';
import serviceList from './services';

(async (): Promise<void> => {
  const gateway = new ApolloGateway({
    serviceList,
  });

  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  sigkill(() => server.stop());

  const { url } = await server.listen(process.env.PORT);

  debug('ready at %s', url);
})();
