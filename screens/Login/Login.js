import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import { Button } from "native-base";
import { loginStyles, styles } from "../../components/Styles";
import logo from "../../components/Images/NetGiverLogo.svg";
import SafeAreaView from "react-native-safe-area-view";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

export const SIGN_IN_DEV = gql`
  mutation signInDev($username: String!) {
    signInDev(username: $username) {
      username
    }
  }
`;

const Login = props => {
  const [username, onChangeText] = useState("");
  const client = useApolloClient();
  const { navigation } = props;
  const [signInDev, { loading, error }] = useMutation(SIGN_IN_DEV, {
    onCompleted({ signInDev }) {
      const username = signInDev.username;
      console.log(username);
      props.navigation.navigate("VerifyLogin", { username: username });
      // client.writeData({ data: { isLoggedIn: true } });
    }
  });
  //SENDS BACK TO LOGIN INCASE OF NO TOKEN 10/24/2019 SD
  const goBack = () => {
    props.navigation.navigate("AuthLoading");
  };

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={loginStyles.header}>Loading</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={loginStyles.header}>
          Invalid Username :( {console.log(error)}
        </Text>
        <Button onPress={goBack} style={styles.button}>
          <Text>Try again!</Text>
        </Button>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={loginStyles.logo}
        source={require("../../components/Images/ng.png")}
      />
      <Text style={loginStyles.header}>Sign In</Text>
      <Text style={loginStyles.subHeader}>
        And leave your paperwork behind!
      </Text>
      <TextInput
        style={loginStyles.loginTextInput}
        placeholder="Username"
        name="username"
        value={username}
        autoCapitalize="none"
        onChangeText={text => onChangeText(text)}
        onFocus={() => onChangeText("")}
      />
      <Button
        style={[loginStyles.signIn, { marginTop: 20 }]}
        onPress={() =>
          signInDev({
            variables: {
              username: username
            }
          })}
      >
        <Text style={loginStyles.buttonText}>Sign In</Text>
      </Button>

      <Text style={loginStyles.buttonHeader}>Don't Have an Account?</Text>

      <Button
        onPress={() => props.navigation.navigate("P1")}
        style={[loginStyles.signUp, { marginTop: 20 }]}
      >
        <Text style={loginStyles.buttonText}>Sign Up</Text>
      </Button>
      {/* NEEDS TO LINK TO CONTACT */}
      <Text style={loginStyles.footerText}>Contact Netgiver Team</Text>
    </SafeAreaView>
  );
};

export default Login;
