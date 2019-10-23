//SD 10/16/19

import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { NavigationActions } from "react-navigation";
import { token } from "../../../token";

const CheckBarCode = props => {
console.log("TCL: props", props)
  const isWorkOrder = {qrCode:"12345", detail:"The Toilet is Leaking", title:"Fix Toilet", priority:"High", status:"Not Yet Started", user:"John Smith"};
  const qrCode = props.navigation.state.params.qrData;
  // const qrCode = "12346";
  const getMutation = `query {
    workorder( qrcode: "${qrCode}"){
      id
          qrcode
      detail
      createdAt
      priority
      status
      title
  
  }
  }`;
  const createMutation = `mutation {
    createWorkorder( qrcode: "${qrCode}"){
      id
      qrcode
      detail
      createdAt
      priority
      status
      title
    }
  }`;

  //CHECK TO SEE IF QR AND SEND BACK
  if (!qrCode) {
    props.navigation.navigate("BarCodeScanner");
  } else {
    //RUN THE MUTATION
    //TODO NEEDS TO BE MOVED OUT OF THIS FILE SD 10/16/19

    //   TOKEN IS NOT CONSTANT!!!!!!!!!!!!!!!!!!!!!!!!!!
    // axios({
    //   method: "post",
    //   url: "https://netgiver-stage.herokuapp.com/graphql",
    //   headers: {
    //     "x-token": token
    //   },

    //   data: {
    //     query: getMutation
    //   }
    // }).then(res => {
      // const isWorkOrder = res.data.data;
      if (isWorkOrder) {
        //IF THERE IS A QR CODE OF THAT VALUE SEND TO EDIT PAGE
        //WITH WORKORDER PROPS PASSED TO IT
        props.navigation.navigate("EditWorkOrder", {
          workOrder: { isWorkOrder }
        });
        console.log("yesWorkOrder");
      } else {
        // axios({
        //   method: "post",
        //   url: "https://netgiver-stage.herokuapp.com/graphql",
        //   headers: {
        //     "x-token": token
        //   },
        //   data: {
        //     query: createMutation
        //   }
        // }).then(res => {
          console.log("created");
          props.navigation.navigate("NewWorkOrder", { qrCode: { qrCode } });
        // });
      }
    // });
  }
  //DISPLAYS A SPINNER IN CASE OF LOAD TIME

  //TODO: NEEDS TO BE STYLED SD 10/16/19
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
export default CheckBarCode;
