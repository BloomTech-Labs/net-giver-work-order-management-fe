import React, { useState } from "react"
import {
    AsyncStorage,
    Text,
    TextInput,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native"
import { styles, loginStyles } from "../../assets/style"
import { Button } from "native-base"
import { gql } from "apollo-boost"
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"

const GET_VER_CODE = gql`
    query getCode($phone: String!, $email: String!) {
        getCode(phone: $phone, email: $email) {
            cellPhone
        }
    }
`
const VERIFY_CODE = gql`
    mutation verifyCode($authyId: String!, $code: String!, $email: String!) {
        verifyCode(authyId: $authyId, code: $code, email: $email) {
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
            token
        }
    }
`

const LoginVerify = ({ navigation }) => {
    const [user, setUser] = useState(navigation.getParam("user", "errr"))
    const [vercode, onChangeText] = useState("")
    const { loading, data, errored } = useQuery(GET_VER_CODE, {
        variables: {
            email: user.username,
            phone: user.phone,
        },
    })
    const client = useApolloClient()
    const [
        verifyCode,
        { loading: verifyloading, error },
    ] = useMutation(VERIFY_CODE, {
        // variables: { authyId: user.authyId, code: vercode, email: user.email },
        onCompleted({ verifyCode }) {
            const token = verifyCode.token
            client.writeData({ data: { isLoggedIn: true } })
            AsyncStorage.setItem("userToken", token).then(() => {
                navigation.navigate("WorkOrderList")
            })
        },
    })

    const goBack = () => {
        navigation.navigate("Login")
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
                returnKeyType="done"
                keyboardType="phone-pad"
            />
            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={() =>
                    verifyCode({
                        variables: {
                            authyId: user.authyId,
                            code: vercode,
                            email: user.email,
                        },
                    })}
            >
                <Text style={topBtn.btnFont}>Verify Access</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 5 }}>
                Didn't get the code? Try Again!
            </Text>
            <View style={spacer.xsBot} />

            <TouchableOpacity
                style={topBtn.fullWidthBtnMarginBottom}
                onPress={goBack}
            >
                <Text style={topBtn.btnFont}>Go Back</Text>
            </TouchableOpacity>
            <Text
                style={text.subheader}
                onPress={() => navigation.navigate("Contact")}
            >
                Contact Netgiver Team
            </Text>
        </SafeAreaView>
    )
}
export default LoginVerify
