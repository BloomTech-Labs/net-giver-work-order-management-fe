import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const WorkOrderList = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is where the List of Workorders Will Display
      </Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("WorkOrderDetail", {
            topic: "React Navigation"
          })
        }
      >
        <Text style={styles.link}>Go to WorkOrder Detail with params</Text>
      </TouchableOpacity>
    </View>
  );
};

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
export default WorkOrderList;
