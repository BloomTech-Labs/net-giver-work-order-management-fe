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

export const GET_VER_CODE = gql`
  query getCode($phone: String!, $email: String!) {
    getCode(phone: $phone, email: $email) {
      cellPhone
    }
  }
`;
