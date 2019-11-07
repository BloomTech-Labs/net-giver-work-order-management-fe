import gql from "graphql-tag";

export const CHECK_FOR_WORKORDER = gql`
  query workorder($qrcode: String) {
    workorder(qrcode: $qrcode) {
      id
      detail
      createdAt
      qrcode
      priority
      status
      title
      user {
        username
      }
      workorderphotos {
        path
      }
    }
  }
`;

export const resolvers = {
  Mutation: {
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      cache.writeData({ data: { isConnected } });
      return null;
    }
  },
  Query: {
    async getToken(_, {}) {
      try {
        return (hastoken = (await AsyncStorage.getItem("userToken")) || null);
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
};
