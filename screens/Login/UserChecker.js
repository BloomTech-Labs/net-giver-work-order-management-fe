import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { styles } from "../../assets/style";
// import {connect} from 'react-redux'

const UserChecker = props => {
  // PULLS USERNAME FROM PROPS 10/24/2019 SD
  const username = props.navigation.state.params.username;
  if (username) {
    // IF IT GETS BACK A USERNAME SENDS TO LOGINVERIFY AND SETS USERNAME TO PROPS 10/24/2019 SD
    props.navigation.navigate("VerifyLogin", { username: username });
  } else {
    //ELSE SENDS BACK TO LOGIN TO TRY AGAIN
    // NEED TO DO SOMETHING TO LOGIN IF USER IS SENT BACK TO "RE-VERIFY" 10/24/2019 SD
    props.navigation.navigate("Login", { sentBack: "true" });
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default UserChecker;
