import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

 const WorkOrderGlobal = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WorkOrder1</Text>
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
    margin: 10,
    color: "blue"
  }
});
export default WorkOrderGlobal