import React from 'react'
import {ActivityIndicator, View, StyleSheet} from 'react-native';
// import {connect} from 'react-redux' sd 10/23/2019

const LoginChecker = (props) => {
console.log("TCL: LoginChecker -> props", props.navigation.state.params)
const username = props.navigation.state.params.username
const token = props.navigation.state.params.token
    if(token) {
        props.navigation.navigate('WorkOrderList', {token:token, username:username})
    }    else{
        props.navigation.navigate('VerifyLogin', {sentBack: true})
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='black'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },})

    // const mapStateToProps = (state) => ({
    //     token: state.authReducer.token
    //   }) sd 10/23/2019


    // export default connect (mapStateToProps)(LoginChecker) sd 10/23/2019
    export default LoginChecker
