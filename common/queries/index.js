import gql from "graphql-tag";
export const USER = gql`
  query currentUser {
    currentUser {
      id
      username
      email
      role
      phone
      authyId
      displayName
      photo {
        path
      }
    }
  }
`;
