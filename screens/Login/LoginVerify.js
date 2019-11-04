import React, { useState, useContext } from 'react'
import { AsyncStorage, Text, TextInput, View, StyleSheet, SafeAreaView, Image } from 'react-native'
// import {connect} from 'react-redux' sd 10/23/2019
// import {doLogin} from '../../store/actions/authActions' sd 10/23/2019
import { styles , loginStyles} from '../../components/Styles'
import { Button } from 'native-base'
import axios from 'axios'
import { UserContext } from "../../context/userState";
// SENDS A TEXT FROM THE AUTH SERVER > ENTER THE TEXT CODE > GET THE TOKEN 10/24/2019 SD
const LoginVerify = props => {
    console.log('TCL: LoginVerify -> props', props)
    // GETS USERNAME OUT OF PROPS 10/24/2019 SD
    const username = props.navigation.state.params.username
    //SETS VERIFY CODE FROM USER INPUT 10/24/2019 SD
    const [vercode, setVercode] = useState('')
    // const [token, setToken] = useState('')
    const { user, setToken  } = useContext(UserContext)
    const vercodeMutation = ``
    const handlePress = () => {
        //DEVELOPMENT VERIFICATION CODE MUTATION SENT TO SERVER AND RETURNING TOKEN IN THE RESULTS 10/24/2019 SD
        const devVerCode = `mutation { authyVerifyDev( username: "${username}", code: "${vercode}" ) { token }}`

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            data: {
                query: devVerCode,
            },
        }).then(res => {
            // NAVIGATES TO LOGINCKECKER AND SETS TddOKEN TO PROPS 10/24/2019 SD
            AsyncStorage.removeItem('TOKEN', (err, result) => {
                AsyncStorage.setItem(
                    'TOKEN',
                    JSON.stringify(res.data.data.authyVerifyDev.token),
                    () => {
                        AsyncStorage.getItem('TOKEN', (err, result) => {
                            console.log('FROM ASYNC', result)
                            setToken({  token:  res.data.data.authyVerifyDev.token}) 
                            props.navigation.navigate('WorkOrderList', {token:res.data.data.authyVerifyDev.token})
                        })
                    }
                )
            })
        })
    }

    //SENDS BACK TO LOGIN INCASE OF NO TOKEN 10/24/2019 SD
    const goBack = () => {
        props.navigation.navigate('Login')
    }
    return (
        <SafeAreaView style={styles.container}>
        {/* LOGO CONTAINER 10/25/2019 */}
        {/* <View style={loginStyles.logo}> */}
            <Image  style={loginStyles.logo} source={require('../../components/Images/ng.png')}/>
        {/* </View> */}
        <Text style={loginStyles.header}>Sign In</Text>
        <Text style={loginStyles.subHeader}>
Please Verify Your Code
        </Text>

<TextInput
    style={styles.loginTextInput}
    placeholder="Verification Code"
    name="vercode"
    id="vercode"
    value={vercode}
    autoCapitalize="none"
    onChangeText={setVercode}
/>
        {/* <View style={loginStyles.signIn}> */}
        <Button style={loginStyles.signIn} onPress={handlePress}>
            <Text style={loginStyles.buttonText}>Verify</Text>
        </Button>

        <Text style={loginStyles.buttonHeader}>Didn't get a code</Text>

        <Button 
            onPress={() => props.navigation.navigate('SignIn')}
            style={loginStyles.signUp}
        >
            <Text style={loginStyles.buttonText}>Sign Up</Text>
        </Button>
        {/* NEEDS TO LINK TO CONTACT */}
        <Text style={loginStyles.footerText}>Contact The Net Giver Team</Text>
    </SafeAreaView>
    )
}

export default LoginVerify
