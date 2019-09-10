// mock data
const users = [
  {
    id: 1,
    fullName: 'C.B. Weber',
    email: 'cb@w.eber',
  },
  {
    id: 2,
    fullName: 'Sara Baren',
    email: 's.baren@d.aren',
  },
  {
    id: 3,
    fullName: 'Horst Meier',
    email: 'horst@m.eier',
  },
  {
    id: 4,
    fullName: 'Lisa Daven',
    email: 'lisa@da.ven',
  },
];

// add some small resolvers
const resolvers = {
  Query: {
    allUsers: (): any => users,
    user: (_: any, { id }: { id: number }): any =>
      users.find((each) => each.id === id),
  },
  User: {
    __resolveReference({ id }: { id: number }): any {
      return users.find((each) => each.id === id);
    },
  },
};

export default resolvers;
