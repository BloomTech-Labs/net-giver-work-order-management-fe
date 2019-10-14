import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

 const WorkOrderDetail = (props) => {
    const { navigation } = props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WorkOrderDetail</Text>
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
  params: {
    textAlign: "center",
    margin: 10
  },
  link: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  }
});
export default WorkOrderDetail