//SD 10/16/19

import React, { useState , useEffect} from "react";
import axios from "axios";
import { StyleSheet, View, Button, ActivityIndicator, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
// import { token } from "../../../token";
import { styles } from '../../../components/Styles'

const CheckBarCode = props => {console.log("TCL: props", props)
// const [token, setToken] = useState();


  const isWorkOrder = {qrCode:"12345", detail:"The Toilet is Leaking", title:"Fix Toilet", priority:"High", status:"Not Yet Started", user:"John Smith"};
  // const qrCode = props.navigation.state.params.qrData;
<<<<<<< HEAD
  const qrCode = "n9325";
=======
  const qrCode = "n6800";
>>>>>>> b7d70bc1edc8edb2159fee3cedc88c8aec49f453
  console.log("QT Work Order Check", qrCode)
  const token = props.navigation.state.params.token

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
  //CHECK TO SEE IF QR AND SEND BACK 10/16/2019 SD
  if (!qrCode) {
    props.navigation.navigate("BarCodeScanner");
  } else {
    //RUN THE MUTATION
    //TODO NEEDS TO BE MOVED OUT OF THIS FILE SD 10/16/19

    //   TOKEN IS NOT CONSTANT!!!!!!!!!!!!!!!!!!!!!!!!!!
    axios({
      method: "post",
      url: "https://netgiver-stage.herokuapp.com/graphql",
      headers: {
        "x-token": token
      },

      data: {
        query: getMutation
      }
    }).then(res => {
      const isWorkOrder = res.data.data;
      if (isWorkOrder) {
        //IF THERE IS A QR CODE OF THAT VALUE SEND TO EDIT PAGE
        //WITH WORKORDER PROPS PASSED TO IT
        props.navigation.navigate("EditWorkOrder", {
          workOrder: { isWorkOrder }, token: token
        });
        console.log("yesWorkOrder");
      } else {
        // IF THERE IS NOT AN EXISTING QR CODE SEND TO THE NEWWORKORDER SCREEN AND SEND THE QR CODE TO THE SCREEN AS PROPS 10/24/2019 SD
        axios({
          method: "post",
          url: "https://netgiver-stage.herokuapp.com/graphql",
          headers: {
            "x-token": token
          },
          data: {
            query: createMutation
          }
        }).then(res => {
          console.log("created");
          props.navigation.navigate("NewWorkOrder", { qrCode: { qrCode }, token: token });
        });
      }
    });
  }
  //DISPLAYS A SPINNER IN CASE OF LOAD TIME 10/16/19 SD

  //TODO: NEEDS TO BE STYLED SD 10/16/19
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    </>
  );
};

export default CheckBarCode;
