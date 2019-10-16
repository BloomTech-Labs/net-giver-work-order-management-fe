import React from 'react'
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

const UserChecker = (props) => {
console.log("TCL: UserChecker -> props", props)

    if(props.username) {
        props.navigation.navigate('LoginVerify')
    }    else{
        props.navigation.navigate('Login')
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
        username: state.authReducer.username
      })


    export default connect (mapStateToProps)(UserChecker)