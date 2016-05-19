"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const typeDefinitions = `
type Query {
  testString: String,
  anotherTestString: Int,
}

schema {
  query: Query
}
`;

exports.default = [typeDefinitions];