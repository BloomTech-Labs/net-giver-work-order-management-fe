import React from 'react'

import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    button:{
      backgroundColor: '#006E13',
      borderWidth: 2,
      borderColor: "#EDF1F3",
    //   alignSelf: 'stretch',
    width:'96%',
    },
    loginTextInput:{
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: '#EDF1F3',
    borderWidth: 2,
    borderColor: '#C5C2C2',
    // box-sizing: border-box;
    borderRadius: 4,
    // alignSelf: "stretch",
    width:'95%',
    padding: 10,
    },
    marginTop:{
        marginTop:30,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    link: {
      fontSize: 16,
      textAlign: 'center',
      margin: 10
    },
    textBox: {
      borderWidth: 1,
      borderColor: '#000',
      margin: 5,
      // fontSize: 30,
      height: 40
    }
  });