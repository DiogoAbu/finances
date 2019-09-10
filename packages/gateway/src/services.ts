const isDev = process.env.NODE_ENV !== 'production';

export default [
  {
    name: 'user',
    url: isDev ? 'http://localhost:3010' : 'http://user:3000',
  },
];
