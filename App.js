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
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import NavigationService from "./NavigationService";
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

const request1 = async operation => {
  const token = await AsyncStorage.getItem("userToken");
  operation.setContext({
    headers: {
      "x-token": token
    }
  });
};

const request = async operation => {
  const token = await AsyncStorage.getItem("userToken");
  operation.setContext(({ headers = {}, localToken = token }) => {
    if (localToken) {
      headers["x-token"] = localToken;
    }
    return {
      headers
    };
  });
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(
    ({ headers = {}, localToken = AsyncStorage.getItem("userToken") }) => {
      if (localToken) {
        headers["x-token"] = localToken;
      }
      return {
        headers
      };
    }
  );

  return forward(operation);
});

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

const signOut = async client => {
  await AsyncStorage.removeItem("userToken");
  client.resetStore();
  NavigationService.navigate("AuthLoading");
};

const wsLink = new WebSocketLink({
  uri: `https://netgiver-stage.herokuapp.com/graphql`,
  options: {
    reconnect: true
  }
});

const uploadlink = new createUploadLink({
  uri: "https://netgiver-stage.herokuapp.com/graphql"
//   uri: "http://localhost:3000/graphql"
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
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          );
          if (message === "NOT_AUTHENTICATED") {
            signOut(client);
          }
        });
      }
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
            <AppNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
            {/* <AppNavigator /> */}
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
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image",
    "http://placehold.jp/006e13/ffffff/80x100.png?text=Placeholder%20Image"
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
