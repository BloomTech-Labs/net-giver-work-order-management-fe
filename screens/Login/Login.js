import React, { useState } from "react"
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native"
import axios from "axios"
import { Button } from "native-base"
import { styles } from "../../assets/style"
import logo from "../../components/Images/NetGiverLogo.svg"
import { gql } from "apollo-boost"
import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"

export const CHECK_USERNAME = gql`
    mutation checkUsername($username: String!) {
        checkUsername(username: $username) {
            user {
                id
                username
                email
                role
                phone
                authyId
                displayName
                photo {
                    path
                }
            }
        }
    }
`

const Login = props => {
    const [username, onChangeText] = useState("")
    const client = useApolloClient()
    const { navigation } = props
    const [checkUsername, { loading, error }] = useMutation(CHECK_USERNAME, {
        onCompleted({ checkUsername }) {
            console.log(checkUsername)
            const user = checkUsername
            props.navigation.navigate("VerifyLogin", { ...checkUsername })
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
                <Text style={text.header}>Loading</Text>
            </SafeAreaView>
        )
    if (error)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={text.header}>
                    Invalid Username :( {console.log(error)}
                </Text>
                <Button onPress={goBack} style={styles.button}>
                    <Text>Try again!</Text>
                </Button>
            </SafeAreaView>
        )
    return (
        <SafeAreaView style={styles.containerNoJustify}>
            <Image
                style={spacer.perlgTop}
                source={require("../../components/Images/ng.png")}
            />
            <Text style={text.headerSmTop}>Sign In</Text>
            <Text style={text.subheader}>And leave your paperwork behind!</Text>
            <View style={spacer.persmBot} />
            <TextInput
                style={txtInput.fullWidthInputMarginBottom}
                placeholder="username or phone number"
                name="username"
                value={username}
                autoCapitalize="none"
                onChangeText={text => onChangeText(text)}
                onFocus={() => onChangeText("")}
                returnKeyType="done"
            />
            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={() =>
                    checkUsername({
                        variables: {
                            username: username,
                        },
                    })}
            >
                <Text style={topBtn.btnFont}>Sign In</Text>
            </TouchableOpacity>
            <Text style={text.subheader}>Don't Have an Account?</Text>
            <View style={spacer.xsBot} />
            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={() => props.navigation.navigate("P1")}
            >
                <Text style={topBtn.btnFont}>Sign Up</Text>
            </TouchableOpacity>

            {/* NEEDS TO LINK TO CONTACT */}
            <Text
                style={text.subheader}
                onPress={() => props.navigation.navigate("Contact")}
            >
                Contact Netgiver Team
            </Text>
        </SafeAreaView>
    )
}

export default Login
