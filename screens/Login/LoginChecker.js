import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { styles } from "../../assets/style";
const LoginChecker = props => {
  const token = props.navigation.state.params.token;
  if (token) {
    props.navigation.navigate("WorkOrderList", { token: token });
  } else {
    props.navigation.navigate("VerifyLogin", { sentBack: true });
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};
export default LoginChecker;
