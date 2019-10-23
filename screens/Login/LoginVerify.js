import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
// import {connect} from 'react-redux' sd 10/23/2019
// import {doLogin} from '../../store/actions/authActions' sd 10/23/2019
import {styles} from '../../components/Styles'
import { Button, InputItem } from '@ant-design/react-native';

const LoginVerify = (props) => {
  console.log("TCL: LoginVerify -> props", props)
  const [vercode, setVercode] = useState('');

  const vercodeMutation = ``;
  const handlePress = () => {
    const devVerCode = `mutation { authyVerifyDev( username: "${props.username}", code: "${vercode}" ) { token }}`
    // props.doLogin(devVerCode) sd 10/23/2019
    props.navigation.navigate('LoginChecker')
  };

  const goBack = () =>{
      props.navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>ADD LOGO</Text>
      <Text>Please Verify Your Code</Text>
      <TextInput
        style={styles.loginTextInput}
        placeholder="Verification Code"
        name="vercode"
        id="vercode"
        value={vercode}
        autoCapitalize="none"
        onChangeText={setVercode}
      />
      <Button onPress={handlePress} style={styles.button}>Verify Access</Button>
      <Text style={styles.marginTop}>Didn't get the code? Try Again!</Text>
      <Button onPress={goBack} style={styles.button}>Get Another Code!</Button>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   textBox: {
//     borderWidth: 1,
//     borderColor: '#000',
//     margin: 5,
//     // fontSize: 30,
//     height: 40
//   },
//   tO: {
//     borderWidth: 1,
//     borderColor: '#000',
//     fontSize: 30,
//     marginTop: 5,
//     marginLeft: 50,
//     marginRight: 50,
//     textAlign: 'center',
//     alignContent: 'center',
//     justifyContent: 'center'
//   }
// });

// const mapStateToProps = (state) => ({
//     username: state.authReducer.username
//   }) sd 10/23/2019
// export default connect(mapStateToProps, {doLogin})(LoginVerify) sd 10/23/2019
export default LoginVerify
