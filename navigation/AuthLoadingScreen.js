import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
// import { ApolloProvider, useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

// const AuthLoadingScreen = props => {
//   const { data } = useQuery(IS_LOGGED_IN);
//   // return data.isLoggedIn ? <Pages /> : <Login />;
//   return (
//     <View>
//       <ActivityIndicator />
//       <StatusBar barStyle="default" />
//       {data.isLoggedIn
//         ? props.navigation.navigate("Main")
//         : props.navigation.navigate("Auth")}
//     </View>
//   );
// };

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
// export default AuthLoadingScreen;
