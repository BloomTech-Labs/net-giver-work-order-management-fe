import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { styles } from '../../components/Styles'
const LoginChecker = props => {
    console.log(
        'TCL: LoginChecker -> props',
        props.navigation.state.params.token
    )
    const token = props.navigation.state.params.token
    // CHECKS TO SEE IF THERE IS A TOKEN IF NOT IT WILL SEND YOU BACK TO THE LOGINVERIFY PAGE TO REVIERIFY YOUR TEXT CODE 10/24/2019 SD
    if (token) {
        props.navigation.navigate('WorkOrderList', { token: token })
    } else {
        props.navigation.navigate('VerifyLogin', { sentBack: true })
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}
export default LoginChecker
