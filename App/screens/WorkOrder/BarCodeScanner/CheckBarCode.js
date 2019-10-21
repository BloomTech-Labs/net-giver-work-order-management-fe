//SD 10/16/19

import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { NavigationActions } from "react-navigation";
import { token } from "../../../token"

const CheckBarCode = props => {
  const qrCode = props.navigation.state.params.qrData;
// const qrCode="00004"
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
  }`

  //check to see if there is a qr code if not send back to the scanner
  if (!qrCode) {
    props.navigation.navigate("BarCodeScanner");
  } else {
    //run the get mutation
    //TODO NEEDS TO BE MOVED OUT OF THIS FILE SD 10/16/19

    //   TOKEN IS NOT CONSTANT!!!!!!!!!!!!!!!!!!!!!!!!!!
    axios({
      method: "post",
      url: "https://netgiver-stage.herokuapp.com/graphql",
      headers: {
        "x-token":
        token },
      data: {
        query: getMutation
      }
    }).then(res => {
      const isWorkOrder = res.data.data;
      if (isWorkOrder) {
        //IF THERE IS A QR CODE OF THAT VALUE SEND TO EDIT PAGE
        //WITH WORKORDER PROPS PASSED TO IT
        props.navigation.navigate("EditViewHolder", {
          workOrder: { isWorkOrder }
        });
        console.log("yesWorkOrder");
      } else {
        axios({
          method: "post",
          url: "https://netgiver-stage.herokuapp.com/graphql",
          headers: {
            "x-token":
            token },
          data: {
            query: createMutation
          }
        }).then(res => { console.log("created")
        props.navigation.navigate("WorkOrderForm", { qrCode: { qrCode } });
      })
      }
    });
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


