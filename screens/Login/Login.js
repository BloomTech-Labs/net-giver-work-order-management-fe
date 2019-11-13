import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import { Button } from "native-base";
import { styles } from "../../assets/style";
import logo from "../../components/Images/NetGiverLogo.svg";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { topBtn } from "../../assets/style/components/buttons";
import { spacer } from "../../assets/style/components/margins";
import { text } from "../../assets/style/components/text";
import { txtInput } from "../../assets/style/components/inputs";

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
        <Text style={text.header}>Loading</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={text.header}>
          Invalid Username :( {console.log(error)}
        </Text>
        <Button onPress={goBack} style={styles.button}>
          <Text>Try again!</Text>
        </Button>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.containerNoJustify}>
      <Image
        style={spacer.perlgTop}
        source={require("../../components/Images/ng.png")}
      />
      <Text style={text.headerSmTop}>Sign In</Text>
      <Text style={text.subheader}>And leave your paperwork behind!</Text>
      <View style={spacer.persmBot} />
      <TextInput
        style={txtInput.fullWidthInputMarginBottom}
        placeholder="Username"
        name="username"
        value={username}
        autoCapitalize="none"
        onChangeText={text => onChangeText(text)}
        onFocus={() => onChangeText("")}
      />
      <TouchableOpacity
        style={topBtn.fullWidthBtnMarginBottom}
        onPress={() =>
          signInDev({
            variables: {
              username: username
            }
          })}
      >
        <Text style={topBtn.btnFont}>Sign In</Text>
      </TouchableOpacity>
      <Text style={text.subheader}>Don't Have an Account?</Text>
      <View style={spacer.xsBot} />
      <TouchableOpacity
        style={topBtn.fullWidthBtnMarginBottom}
        onPress={() => props.navigation.navigate("P1")}
      >
        <Text style={topBtn.btnFont}>Sign Up</Text>
      </TouchableOpacity>

      {/* NEEDS TO LINK TO CONTACT */}
      <Text
        style={text.subheader}
        onPress={() => props.navigation.navigate("Contact")}
      >
        Contact Netgiver Team
      </Text>
    </SafeAreaView>
  );
};

export default Login;
