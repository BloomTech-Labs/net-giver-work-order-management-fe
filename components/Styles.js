import React from 'react'

import {StyleSheet} from 'react-native'
const plex = "fontFamily: 'IBMPlexSans-Regular'"
export const styles = StyleSheet.create({
    button:{
      backgroundColor: '#006E13',
      borderWidth: 2,
      borderColor: "#EDF1F3",
    //   alignSelf: 'stretch',
    width:'96%',
    fontFamily:'IBMPlexSans-Regular',
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
        width:'100%',
        padding: 10,
    },
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center",
      backgroundColor: 'white',
      paddingHorizontal: 16
      
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
  export const wOList = StyleSheet.create({
    card: {
        borderWidth: 1,
        width:'95%',
        alignSelf: 'center',
        borderColor:'grey',
        flexDirection: 'row',
        marginBottom: 4,
    },
    cardLeft: {
        flex: 2,
        textAlign: 'right',
        padding: 10,
    },
    cardMiddle: {
        flex: 4,
        padding: 5,
    },
    cardRight: {
        flex: 2,
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
})

export const wOForm = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    button: {
        backgroundColor: '#006E13',
        borderWidth: 2,
        borderColor: '#EDF1F3',
        width: '96%',
        alignSelf: 'center',
    },
    textInput: {
        marginBottom: 15,
        backgroundColor: '#EDF1F3',
        borderWidth: 2,
        borderColor: '#C5C2C2',
        // box-sizing: border-box;
        borderRadius: 4,
        // alignSelf: "stretch",
        width: '95%',
        alignSelf: 'center',
        padding: 10,
    },
    priorityBar: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    pBarText: {
        marginLeft: 10,
    },
    pBarButtonBox: {
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        borderRightWidth: 0.5,
        borderRadius: 4,
    },
    pBarButton: {
        // borderWidth: 0.5,
        // borderRadius:4,
        borderRightWidth: 0.5,
        padding: 2,
        // borderTopRightRadius:4,
        // borderBottomRightRadius:4,
    },
    placeholder:{
        width:75,
        height:75,
        // alignSelf:'center',
        // marginBottom:25,
        // borderRadius:100,
    },
    imageBox:{
        width: '95%',
        flexDirection: 'row',
        justifyContent:'space-around',
        marginRight: 'auto',
        marginLeft:'auto',
        borderWidth: 1,
        padding: 10,
        
    }
})

export const loginStyles = StyleSheet.create({
        //LOGO CONTAINER -- GET STYLES FROM FIGMA 10/25/2019 SD
        logo: {
            
            // width:222,
        },
        header: {
            fontFamily: 'IBMPlexSans-Medium',
            fontSize: 24,
            // lineHeight: 25,
            textAlign: 'center',
            letterSpacing: -0.165,
            color: 'black',
            paddingBottom: 8
        },
        subHeader: {
            fontFamily: 'IBMPlexSans-Regular',
            fontSize: 17,
            lineHeight: 16,
            textAlign: 'center',
            // letterSpacing: -0.165,
            color: 'black',
        },
        loginTextInput: {
            color: 'black',
            backgroundColor: '#EDF1F3',
            borderColor: '#C5C2C2',
            borderWidth: 1,
            // box-sizing: border-box,
            borderRadius: 4,
            padding:10,
            fontFamily:'IBMPlexSans-Regular',
            width: '100%',
            marginTop: 30

        },
        buttons: {
            backgroundColor: '#00830B',
            borderRadius: 4,
            width: '100%',
        },
        buttonHeader: {
            marginTop: 10,
                },
        buttonText: {
            fontFamily: 'IBMPlexSans-Regular',
            fontSize: 17,
            // lineHeight: 14,
            marginRight: 'auto',
            marginLeft: 'auto',
            color: '#FFFFFF',
        },
        footerText:{
            fontFamily: 'IBMPlexSans-Regular',
            fontSize: 17,
            marginTop: 35
            // fontWeight: '500',
        },
    })