import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//THIS IS THE EDIT / VIEW WORK ORDER COMPONENT AFTER THE BARCODE IS FOUND...
const EditViewHolder = (props) => {
  //WORKORDER PROPS ARE PASSED IN FROM THE CHECKBARCODE PAGE
    console.log("TCL: Signup -> props", props)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PLACEHOLDER FOR EDIT/VIEW AFTER BARCODE SCANNED</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.goBack}>Go Back</Text>
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
  goBack: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  }
});
export default EditViewHolder

//SD 10/16/19 PLACEHOLDER