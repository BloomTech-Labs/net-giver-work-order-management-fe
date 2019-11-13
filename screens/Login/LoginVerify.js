import React, { useState } from "react"
import {
    AsyncStorage,
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native"
import { styles, loginStyles } from "../../assets/style"
import { Button } from "native-base"
import { gql } from "apollo-boost"
import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"

export const AUTHY_VERIFY_DEV = gql`
    mutation authyVerifyDev($username: String!, $code: String!) {
        authyVerifyDev(username: $username, code: $code) {
            token
        }
    }
`

// SENDS A TEXT FROM THE AUTH SERVER > ENTER THE TEXT CODE > GET THE TOKEN 10/24/2019 SD
const LoginVerify = props => {
    // GETS USERNAME OUT OF PROPS 10/24/2019 SD
    const username = props.navigation.state.params.username
    //SETS VERIFY CODE FROM USER INPUT 10/24/2019 SD
    const [vercode, onChangeText] = useState("")
    const [token, setToken] = useState("")
    const client = useApolloClient()
    const [authyVerifyDev, { loading, error }] = useMutation(AUTHY_VERIFY_DEV, {
        onCompleted({ authyVerifyDev }) {
            const token = authyVerifyDev.token
            client.writeData({ data: { isLoggedIn: true } })
            AsyncStorage.setItem("userToken", token).then(() => {
                props.navigation.navigate("WorkOrderList")
            })
        },
    })

    //SENDS BACK TO LOGIN INCASE OF NO TOKEN 10/24/2019 SD
    const goBack = () => {
        props.navigation.navigate("Login")
    }
    return (
        <SafeAreaView style={styles.containerNoJustify}>
            <Image
                style={spacer.perlgTop}
                source={require("../../components/Images/ng.png")}
            />
            <Text style={text.headerSmTop}>Sign In</Text>
            <Text style={text.subheader}>Please Verify Your Code</Text>
            <View style={spacer.persmBot} />
            <TextInput
                style={txtInput.fullWidthInputMarginBottom}
                placeholder="Verification Code"
                name="vercode"
                id="vercode"
                value={vercode}
                autoCapitalize="none"
                onChangeText={text => onChangeText(text)}
                onFocus={() => onChangeText("")}
            />
            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={() =>
                    authyVerifyDev({
                        variables: {
                            username: username,
                            code: vercode,
                        },
                    })
                }
            >
                <Text style={topBtn.btnFont}>Verify Access</Text>
            </TouchableOpacity>
            <Text style={text.subheader}>Didn't get the code? Try Again!</Text>
            <View style={spacer.xsBot} />

            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={() => props.navigation.goBack()}
            >
                <Text style={topBtn.btnFont}>Go Back</Text>
            </TouchableOpacity>
            <Text
                style={text.subheader}
                onPress={() => props.navigation.navigate("Contact")}
            >
                Contact Netgiver Team
            </Text>
        </SafeAreaView>
    )
}

export default LoginVerify
