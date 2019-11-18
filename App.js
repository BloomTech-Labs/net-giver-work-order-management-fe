import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  Image
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
//import { typeDefs, resolvers } from "./resolvers";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

/*Cache: persists across sessions. stable images, logos, username */
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      workorder: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Workorder", id: args.id })
    }
    // Query: {
    //   workorders: (_, args, { getCacheKey }) =>
    //     args.edges.ids.map(id =>
    //       getCacheKey({ __typename: "WorkorderConnection", id: id })
    //     )
    // }
  }
});

///////////////reset token functionality//////////
const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 400
  ) {
    // remove cached token on 401 from the server
    const token = null;
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

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/`,
  options: {
    reconnect: true
  }
});

const uploadlink = new createUploadLink({
  uri: "http://localhost:3000/graphql"
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadlink
);

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
        let token;
        return (token = null);
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware,
    withClientState({
      defaults: {
        isConnected: true,
        hasCameraPermission: false,
        isLoggedIn: false,
        hastoken: false
      },
      // resolvers,
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
    link
    // new HttpLink({
    //   // uri: "http://localhost:3000/graphql"
    //   uri: "https://netgiver-stage.herokuapp.com/graphql"
    // })
    // createUploadLink({ uri: "http://localhost:3000/graphql" })
    // createUploadLink({ uri: "https://netgiver-stage.herokuapp.com/graphql" })
    // createUploadLink({ uri: "https://netgiver-stage-pr-11.herokuapp.com/" })
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
      <Root>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <ApolloProvider client={client}>
            <AppNavigator />
          </ApolloProvider>
        </View>
      </Root>
    );
  }
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
const fonts = {
  // This is the font that we are using for our tab bar
  ...Ionicons.font,

  "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  "IBMPlexSans-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
  "IBMPlexSans-Medium": require("./assets/fonts/IBMPlexSans-Medium.ttf")
};
async function loadResourcesAsync() {
  const imageAssets = cacheImages([
    require("./components/Images/ng.png"),
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image",
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image"
  ]);

  const fontAssets = cacheFonts([fonts]);

  await Promise.all([...imageAssets, ...fontAssets]);
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
