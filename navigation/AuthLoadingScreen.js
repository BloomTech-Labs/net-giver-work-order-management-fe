import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// const IS_LOGGED_IN2 = gql`
//   query IsUserLoggedIn {
//     isUserLoggedIn @client
//   }
// `;

// const IS_LOGGED_IN = gql`
//   query {
//     getToken @client {
//       hastoken
//     }
//   }
// `;
// const AuthLoadingScreen = props => {
//   const client = useApolloClient();

//    const userToken = await AsyncStorage.getItem("userToken");

//   const { hastoken } = useQuery(IS_LOGGED_IN);

//   hastoken
//     ? props.navigation.navigate("Main", { token: token }) ||
//       console.log(hastoken)
//     : props.navigation.navigate("Auth", { sentBack: true });

//   return (
//     <View>
//       <ActivityIndicator size="large" color="black" />
//     </View>
//   );
// };
// export default AuthLoadingScreen;
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
