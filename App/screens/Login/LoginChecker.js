import React from 'react'
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

const LoginChecker = (props) => {
console.log("TCL: LoginChecker -> props", props)

    if(props.token) {
        props.navigation.navigate('Dashboard')
    }    else{
        props.navigation.navigate('LoginVerify', {sentBack: true})
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

    const mapStateToProps = (state) => ({
        token: state.authReducer.token
      })


    export default connect (mapStateToProps)(LoginChecker)
