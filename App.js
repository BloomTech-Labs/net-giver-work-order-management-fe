import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import { Root } from "native-base";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//const cache = new InMemoryCache();
// const client = new ApolloClient({
//   cache,
//   uri: "https://netgiver-stage.herokuapp.com/graphql",
//   headers: {
//     "x-token": AsyncStorage.getItem("TOKEN"),
//     "client-name": "WOM [app]",
//     "client-version": "1.0.0"
//   },
//   typeDefs,
//   resolvers
// });

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

// cache.writeData({
//   data: {
//     isLoggedIn: !!AsyncStorage.getItem("TOKEN"),
//     cartItems: []
//   }
// });

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <ApolloProvider client={client}>
          <AppNavigator>
            {/* {console.log(client)} */}
          </AppNavigator>
        </ApolloProvider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app

      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      Roboto_medium: require("./assets/fonts/Roboto_medium.ttf"),
      "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
      "IBMPlexSans-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
      "IBMPlexSans-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
