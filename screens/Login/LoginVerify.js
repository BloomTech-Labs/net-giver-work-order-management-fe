import React, { useState } from "react";
import {
  AsyncStorage,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image
} from "react-native";
import { styles, loginStyles, wOForm } from "../../components/Styles";
import { Button } from "native-base";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

export const AUTHY_VERIFY_DEV = gql`
  mutation authyVerifyDev($username: String!, $code: String!) {
    authyVerifyDev(username: $username, code: $code) {
      token
    }
  }
`;

const LoginVerify = props => {
  const username = props.navigation.state.params.username;
  const [vercode, onChangeText] = useState("");
  const [token, setToken] = useState("");
  const client = useApolloClient();
  const [authyVerifyDev, { loading, error }] = useMutation(AUTHY_VERIFY_DEV, {
    onCompleted({ authyVerifyDev }) {
      const token = authyVerifyDev.token;
      client.writeData({ data: { isLoggedIn: true } });
      AsyncStorage.setItem("userToken", token).then(() => {
        props.navigation.navigate("WorkOrderList");
      });
    }
  });

  const goBack = () => {
    props.navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Image
        style={loginStyles.logo}
        source={require("../../components/Images/ng.png")}
      />
      <Text>Please Verify Your Code</Text>
      <TextInput
        style={styles.loginTextInput}
        placeholder="Verification Code"
        name="vercode"
        id="vercode"
        value={vercode}
        autoCapitalize="none"
        onChangeText={text => onChangeText(text)}
        onFocus={() => onChangeText("")}
      />
      <Button
        style={wOForm.submitButton}
        onPress={() =>
          authyVerifyDev({
            variables: {
              username: username,
              code: vercode
            }
          })}
      >
        <Text style={loginStyles.buttonText}>Verify Access</Text>
      </Button>
      <Text style={{ marginTop: 5 }}>Didn't get the code? Try Again!</Text>

      <Button style={[wOForm.submitButton, { marginTop: 20 }]} onPress={goBack}>
        <Text style={loginStyles.buttonText}>Get Another Code!</Text>
      </Button>
    </View>
  );
};

export default LoginVerify;
