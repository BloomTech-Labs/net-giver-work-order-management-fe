import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {textS} from '../../Style'
 const WorkOrderDetail = (props) => {
    const { navigation } = props;
    return (
      <View style={styles.container}>
        <Text style={textS.heading}>WorkOrderDetail</Text>
        <Text style={textS.heading}>Date Created: 07/04/1776</Text>
        <Text style={textS.heading}>Location: Philly</Text>
        <Text style={textS.heading}>Priority:      
        <Text style={{ color: '#fff', paddingHorizontal: 24, backgroundColor: 'red' }}>High</Text>
        </Text>
        <Image 
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/1920px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg'
          }} 
          style={{ 
            width: 300, 
            height: 240 
          }}
        />

        <Text style={textS.heading}>Description: Signing of the United States Declaration of Independence</Text>
        <Text style={textS.heading}>Created by: Me</Text>
        <Text style={textS.heading}>Assigned To: You</Text>
        <Image 
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
          }} 
          style={{ 
            width: 100, 
            height: 100 
          }}
        />
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