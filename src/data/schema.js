const typeDefinitions = `
type Query {
  testString: String,
  anotherTestString: Int,
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
