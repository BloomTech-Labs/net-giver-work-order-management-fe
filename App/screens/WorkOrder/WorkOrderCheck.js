import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {doCreateQr} from '../../store/actions/workActions'
import { connect } from 'react-redux';

 const WorkOrderCheck = (props) => {
    console.log("TCL: WorkOrderCheck -> props", props.navigation.state.params.qrcode)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is where we will check to see if there is a workorder if not make a new one
        {props.navigation.state.params.qrcode}
        </Text>
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
const mapStateToProps = (state) => ({
    token: state.authReducer.token
  })


export default connect (mapStateToProps, {doCreateQr})(WorkOrderCheck)