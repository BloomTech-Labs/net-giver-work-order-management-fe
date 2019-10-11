import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

// Needs Login Form / Function 

 const Login = (props) => {
  function resetToDashboard() {
    props.navigation.navigate("Dashboard");
  }

    const { navigation } = props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <TouchableOpacity onPress={() => resetToDashboard()}>
          <Text style={[styles.link, { color: "blue" }]}>Go to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  link: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  }
});
export default Login