import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import axios from 'axios'
import { Button } from 'native-base'
import { styles } from '../../components/Styles'

const Login = props => {
    const [token, setToken] = useState()
    // SETS USERNAME FROM INPUT BOX 10/24/2019 SD
    const [username, setUsername] = useState()


    // SENDS MUTATION TO GQL SERVER TO GET BACK USERNAME IF THERE IS A VERIFIED USER BY THAT NAME
    // NEEDS TO BE INTEGRATED SO THAT YOU ONLY HAVE TO ENTER USERNAME ONE TIME 10/24/2019 SD
    const submit = () => {
        console.log(', username', username)
        const query = `mutation{signIn(login:"${username}"){  token   user {     username     authyId   } }} `
        const queryDev = `mutation { signInDev( username: "${username}" ) { username } }`

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            data: {
                query: queryDev,
            },
        }).then(res => {
            //NAVIGATES TO USERCHECKER AND SETS USERNAME TO PROPS 10/24/2019 SD
            props.navigation.navigate('CheckUser', {
                username: res.data.data.signInDev.username,
            })
        })
    }


    const { navigation } = props
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>ADD LOGO</Text>
            <Text style={styles.welcome}>Sign In</Text>
            <Text>And leave your paperwork behind!</Text>
            <TextInput
                style={styles.loginTextInput}
                placeholder="User Name"
                name="username"
                id="username"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
            />
            <Button style={styles.button} onPress={submit}>
                <Text>Sign In</Text>
            </Button>
            <Text style={styles.marginTop}>Don't Have an Account?</Text>
            <Button
                onPress={() => props.navigation.navigate('SignUp')}
                style={styles.button}
            >
                <Text>Sign Up</Text>
            </Button>
        </View>
    )
}

export default Login
