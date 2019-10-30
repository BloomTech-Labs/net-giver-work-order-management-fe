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

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();
///////////////reset token functionality//////////
const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 400
  ) {
    // remove cached token on 401 from the server
    token = null;
  }
});

///////////////reset token functionality//////////

const request = async operation => {
  const token = (await AsyncStorage.getItem("userToken")) || null;
  operation.setContext({
    headers: {
      "x-token": token
    }
  });
};

const authMiddleware = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const removeToken = async () => {
  await AsyncStorage.removeItem("userToken");
  // .then(() => {
  //   this.props.navigation.navigate("Auth");
  // });
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          )
        );
      if (
        networkError &&
        networkError.name === "ServerError" &&
        networkError.statusCode === 400
      ) {
        // remove cached token on 401 from the server
        return (token = null);
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } });
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      // uri: "http://localhost:3000/graphql"
      uri: "https://netgiver-stage-pr-10.herokuapp.com/graphql"
    })
  ]),
  cache
});

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
          <AppNavigator />
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
