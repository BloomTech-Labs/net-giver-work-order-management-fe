import React, {useContext} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { UserContext } from "../../context/userState";

 AuthCheck = (props) => {
    const { user } = useContext(UserContext)
    const token = user.token
    props.navigation.navigate(token ? 'Main' : 'Auth');

return(
    <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View> 
)
}
export default AuthCheck