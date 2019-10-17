//SD 10/16/19 //STILL NEED TO BUILD PAGE

import React from "react";
import GetImage from '../../../components/GetImage'
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
const NewWorkOrderPhoto = props => {
  // console.log("TCL: NewWorkOrderPhoto -> props", props)
  const qrCode = props.navigation.state.params.qrCode;
  console.log("TCL: qrCode", qrCode);
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
  return (
    <SafeAreaView>
      <View>
        <Text>Please Choose a Photo to Start your Workorder</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('GetImage', {from:'newWorkOrder'})}>
          <Text>Choose From Gallery</Text>
        </TouchableOpacity>
        <GetImage />
      </View>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Camera', {from:'newWorkOrder'})}>
          <Text>Use the Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewWorkOrderPhoto;
