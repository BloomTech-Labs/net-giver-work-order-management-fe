import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native"
import axios from "axios"
import { Button } from "native-base"

import { loginStyles, styles } from "../../components/Styles"
import logo from "../../components/Images/NetGiverLogo.svg"
import SafeAreaView from "react-native-safe-area-view"
import { gql } from "apollo-boost"
import { useApolloClient, useMutation } from "@apollo/react-hooks"

export const SIGN_IN_DEV = gql`
    mutation signInDev($username: String!) {
        signInDev(username: $username) {
            username
        }
    }
`

const Login = props => {
    const [username, onChangeText] = useState("")
    const client = useApolloClient()
    const { navigation } = props
    const [signInDev, { loading, error }] = useMutation(SIGN_IN_DEV, {
        onCompleted({ signInDev }) {
            const username = signInDev.username
            console.log(username)
            props.navigation.navigate("VerifyLogin", { username: username })
            // client.writeData({ data: { isLoggedIn: true } });
        },
    })
    //SENDS BACK TO LOGIN INCASE OF NO TOKEN 10/24/2019 SD
    const goBack = () => {
        props.navigation.navigate("AuthLoading")
    }

    if (loading)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={loginStyles.header}>Loading</Text>
            </SafeAreaView>
        )
    if (error)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={loginStyles.header} testID="header">
                    Invalid Username :( {console.log(error)}
                </Text>
                <Button onPress={goBack} style={styles.button}>
                    <Text>Try again!</Text>
                </Button>
            </SafeAreaView>
        )
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={loginStyles.logo}
                source={require("../../components/Images/ng.png")}
            />
            {/* </View> */}
            <Text style={loginStyles.header}>Sign In</Text>
            <Text style={loginStyles.subHeader}>
                And leave your paperwork behind!
            </Text>
            <TextInput
                style={loginStyles.loginTextInput}
                placeholder="Username"
                name="username"
                value={username}
                autoCapitalize="none"
                onChangeText={text => onChangeText(text)}
                onFocus={() => onChangeText("")}
            />
            {/* <View style={loginStyles.signIn}> */}
            <Button
                style={[loginStyles.buttons, { marginTop: 20 }]}
                onPress={() =>
                    signInDev({
                        variables: {
                            username: username,
                        },
                    })
                }
            >
                <Text style={loginStyles.buttonText}>Sign In</Text>
            </Button>

            <Text style={loginStyles.buttonHeader}>Don't Have an Account?</Text>

            <Button
                onPress={() => props.navigation.navigate("P1")}
                style={[loginStyles.buttons, { marginTop: 20 }]}
            >
                <Text style={loginStyles.buttonText}>Sign Up</Text>
            </Button>
            {/* NEEDS TO LINK TO CONTACT */}
            <Text style={loginStyles.footerText}>Contact Netgiver Team</Text>
        </SafeAreaView>
    )
}

// LEFT IN STYLESHEET SO THAT IT COULD BE LOOKED AT EASILY FOR REFERENCE 10/25/2019 SD

// const LoginStyles = StyleSheet.create({
//   //LOGO CONTAINER -- GET STYLES FROM FIGMA 10/25/2019 SD
//   logo: {
//     borderWidth: 2,
//     position: "absolute",
//     left: "auto",
//     right: "auto",
//     top: "9.15%",
//     bottom: "73.91%"
//     // width:222,
//   },
//   header: {
//     position: "absolute",
//     left: "38.93%",
//     right: "39.2%",
//     top: "30.28%",
//     bottom: "60.62%",
//     fontFamily: "IBMPlexSans-Medium",
//     fontSize: 24,
//     // lineHeight: 25,
//     textAlign: "center",
//     letterSpacing: -0.165,
//     color: "black"
//   },
//   subHeader: {
//     position: "absolute",
//     left: "14.67%",
//     right: "14.67%",
//     top: "37.93%",
//     bottom: "57.97%",
//     fontFamily: "IBMPlexSans-Regular",
//     fontSize: 17,
//     lineHeight: 16,
//     textAlign: "center",
//     // letterSpacing: -0.165,
//     color: "black"
//   },
//   loginTextInput: {
//     position: "absolute",
//     left: "4.27%",
//     right: "4.27%",
//     top: "45.28%",
//     bottom: "46.48%",
//     color: "black",
//     backgroundColor: "#C4C4C4",
//     borderWidth: 1,
//     // box-sizing: border-box,
//     borderRadius: 4,
//     padding: 10,
//     fontFamily: "IBMPlexSans-Regular"
//   },
//   signIn: {
//     position: "absolute",
//     left: "4.27%",
//     right: "4.27%",
//     top: "58.17%",
//     bottom: "35.08%",
//     borderColor: "black",
//     backgroundColor: "#00830B",
//     borderWidth: 1,
//     // boxSizing: 'border-box',
//     borderRadius: 4
//   },
//   signUp: {
//     position: "absolute",
//     left: "4.27%",
//     right: "4.27%",
//     top: "72.17%",
//     bottom: "25.08%",
//     borderColor: "black",
//     backgroundColor: "#00830B",
//     borderWidth: 1,
//     borderColor: "#EDF1F3",
//     // boxSizing: 'border-box',
//     borderRadius: 4
//   },
//   buttonHeader: {
//     position: "absolute",
//     left: "auto",
//     right: "auto",
//     top: "67.17%",
//     bottom: "25.08%"
//   },
//   buttonText: {
//     fontFamily: "IBMPlexSans-Regular",
//     fontSize: 17,
//     // lineHeight: 14,
//     marginRight: "auto",
//     marginLeft: "auto",
//     color: "#FFFFFF"
//   },
//   footerText: {
//     position: "absolute",
//     left: "auto",
//     right: "auto",
//     top: "85.41%",
//     bottom: "10.49%",
//     fontFamily: "IBMPlexSans-Regular",
//     fontSize: 17
//     // fontWeight: '500',
//   }
// });

export default Login
