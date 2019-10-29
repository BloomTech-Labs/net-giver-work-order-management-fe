import React, {useContext} from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
  import {UserContext} from '../../context/userState'
const AuthLogin = (props) => {
    const { user } = useContext(UserContext)
    props.navigation.navigate(user.token ? 'Main' : 'Auth')
    return (
        <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
}

export default AuthLogin
