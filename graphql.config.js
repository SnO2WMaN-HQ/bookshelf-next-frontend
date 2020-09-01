module.exports = {
  schemaPath: 'schema.graphql',
  extensions: {
    endpoints: {
      default: {
        url: 'http://localhost:4000/graphql',
      },
    },
  },
};
