import './services/dotenv';

import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

import services from './serviceList.json';
import debug from './services/debug';
import sigkill from './services/sigkill';

const isDev = process.env.NODE_ENV !== 'production';

(async () => {
  try {
    const serviceList = Object.entries(services).map(([name, port]) => ({
      name,
      url: isDev ? `http://localhost:${port}` : 'http://user:3000',
    }));

    // Add services
    const gateway = new ApolloGateway({ serviceList });

    // Load schema
    const { schema, executor } = await gateway.load();

    // Define server
    const server = new ApolloServer({ schema, executor });

    // Handle shutdown
    sigkill(() => server.stop());

    // Start server
    const { url } = await server.listen(process.env.PORT);

    debug('ready at %s', url);
  } catch (err) {
    debug(err);
  }
})();
