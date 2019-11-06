import React from 'react'

import { StyleSheet } from 'react-native'
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
        margin: 10,
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#000',
        margin: 5,
        // fontSize: 30,
        height: 40,
    },
})
export const wOList = StyleSheet.create({
    card: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 4,
        paddingLeft: 9,
        paddingRight: 14,
        paddingTop: 13,
        paddingBottom: 31,
    },
    info: {
        borderRadius: 4,
        height: 20
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center'
    },
    status: {
        width: 84,
    },
    priority: {
        width: 40,
        marginLeft: 5
    },
    qr: {
        width: 65,
        color: '#8B9195',
        backgroundColor: '#F2F5F7'
    },
    qrPriority: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 'auto',
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
    },
    cardSubContent: {
        flexDirection: "column"
    },
    cardLeft: {
        
    },
    cardMiddle: {
        
    },
    cardRight: {
        alignItems: 'flex-end',
        marginLeft: 'auto'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 4,
        marginRight: 22,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 1,
    },
})

export const wOForm = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    button: {
        //this is the submit button at the bottom
        backgroundColor: '#006E13',
        borderWidth: 2,
        borderColor: '#EDF1F3',
        width: '96%',
        alignSelf: 'center',
    },
    textInputGlobal: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: '#BFBCBC',
        padding: 20,
        fontSize: 15,
    },
    textInputTitle: {
        
    },
    textInputDesc: {

    },
    priorityContainer: {
       
    },
    priorityDiv: {

    },
    priorityBar: {
        // the priority & rows as a whole
        flexDirection: 'row',
        marginBottom: 25,
        // borderColor: 'green',
        // width: '100%',
        justifyContent: 'space-between',
        marginRight: 25,
    },
    // pBarText: {
    //     marginLeft: 100,
    // },
    pBarButtonBox: {
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        borderRightWidth: 0.5,
        borderRadius: 4,
        borderColor: 'red',
        width: '75%',
        justifyContent: 'space-around',
    },
    pBarButton: {
        // borderWidth: 0.5,
        borderRadius: 4,
        borderRightWidth: 0.5,
        padding: 2,
        borderColor: 'green',
        borderStyle: 'solid',
        backgroundColor: 'blue',

        // borderTopRightRadius:4,
        // borderBottomRightRadius:4,
    },
    placeholder: {
        width: 75,
        height: 75,
        // alignSelf:'center',
        // marginBottom:25,
        // borderRadius:100,
    },
    imageBox: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        padding: 10,
    },
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
