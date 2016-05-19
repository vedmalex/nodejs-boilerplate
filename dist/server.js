'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphqlTools = require('graphql-tools');

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _mocks = require('./data/mocks');

var _mocks2 = _interopRequireDefault(_mocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRAPHQL_PORT = 8080;

const graphQLServer = (0, _express2.default)();

graphQLServer.use('/', (0, _graphqlTools.apolloServer)({
  graphiql: true,
  pretty: true,
  schema: _schema2.default,
  mocks: _mocks2.default
}));

graphQLServer.use('/one', (0, _graphqlTools.apolloServer)({
  graphiql: true,
  pretty: true,
  schema: _schema2.default,
  mocks: _mocks2.default
}));

graphQLServer.use('/two', (0, _graphqlTools.apolloServer)({
  graphiql: true,
  pretty: true,
  schema: _schema2.default,
  mocks: _mocks2.default
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${ GRAPHQL_PORT }`));