// module.exports = {
//   client: {
//     name: "womapi",
//     service: "womapi"
//   }
// };

module.exports = {
  client: {
    service: {
      // name: "womapi",
      url: "http://localhost:3000/graphql",
      // optional headers
      // optional disable SSL validation check
      skipSSLValidation: true
    }
  }
};

// module.exports = {
//   client: {
//     service: {
//       name: 'my-service-name',
//       localSchemaFile: './path/to/schema.graphql'
//     }
//   }
// };
