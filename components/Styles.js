import React from 'react'

import { StyleSheet } from 'react-native'
const plex = "fontFamily: 'IBMPlexSans-Regular'"
export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#006E13',
        borderWidth: 2,
        borderColor: '#EDF1F3',
        //   alignSelf: 'stretch',
        width: '96%',
        fontFamily: 'IBMPlexSans-Regular',
    },
    loginTextInput: {
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: '#EDF1F3',
        borderWidth: 2,
        borderColor: '#C5C2C2',
        // box-sizing: border-box;
        borderRadius: 4,
        // alignSelf: "stretch",
        width: '95%',
        padding: 10,
    },
    marginTop: {
        marginTop: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        borderColor: 'grey',
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
        borderWidth: 2,
        position: 'absolute',
        left: 'auto',
        right: 'auto',
        top: '9.15%',
        bottom: '73.91%',
        // width:222,
    },
    header: {
        position: 'absolute',
        left: '38.93%',
        right: '39.2%',
        top: '30.28%',
        bottom: '60.62%',
        fontFamily: 'IBMPlexSans-Medium',
        fontSize: 24,
        // lineHeight: 25,
        textAlign: 'center',
        letterSpacing: -0.165,
        color: 'black',
    },
    subHeader: {
        position: 'absolute',
        left: '14.67%',
        right: '14.67%',
        top: '37.93%',
        bottom: '57.97%',
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 17,
        lineHeight: 16,
        textAlign: 'center',
        // letterSpacing: -0.165,
        color: 'black',
    },
    loginTextInput: {
        position: 'absolute',
        left: '4.27%',
        right: '4.27%',
        top: '45.28%',
        bottom: '46.48%',
        color: 'black',
        backgroundColor: '#C4C4C4',
        borderWidth: 1,
        // box-sizing: border-box,
        borderRadius: 4,
        padding: 10,
        fontFamily: 'IBMPlexSans-Regular',
    },
    signIn: {
        position: 'absolute',
        left: '4.27%',
        right: '4.27%',
        top: '58.17%',
        bottom: '35.08%',
        borderColor: 'black',
        backgroundColor: '#00830B',
        borderWidth: 1,
        // boxSizing: 'border-box',
        borderRadius: 4,
    },
    signUp: {
        position: 'absolute',
        left: '4.27%',
        right: '4.27%',
        top: '72.17%',
        bottom: '25.08%',
        borderColor: 'black',
        backgroundColor: '#00830B',
        borderWidth: 1,
        borderColor: '#EDF1F3',
        // boxSizing: 'border-box',
        borderRadius: 4,
    },
    buttonHeader: {
        position: 'absolute',
        left: 'auto',
        right: 'auto',
        top: '67.17%',
        bottom: '25.08%',
    },
    buttonText: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 17,
        // lineHeight: 14,
        marginRight: 'auto',
        marginLeft: 'auto',
        color: '#FFFFFF',
    },
    footerText: {
        position: 'absolute',
        left: 'auto',
        right: 'auto',
        top: '85.41%',
        bottom: '10.49%',
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 17,
        // fontWeight: '500',
    },
})
