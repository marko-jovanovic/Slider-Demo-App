module.exports = {
  schema: ['schema.graphql'],
  documents: ["./gql-queries/*.tsx"],
  overwrite: true,
  generates: {
    "./generated/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        apolloReactHooksImportFrom: "@apollo/client",
        dedupeOperationSuffix: true,
      }
    }
  }
};