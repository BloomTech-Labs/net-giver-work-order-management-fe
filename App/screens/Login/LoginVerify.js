import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import {connect} from 'react-redux'
import {doLogin} from '../../store/actions/authActions'
const LoginVerify = (props) => {
  console.log("TCL: LoginVerify -> props", props)
  const [vercode, setVercode] = useState('');
  if(props.navigation.state.params && props.navigation.state.params.sentBack)
  {
    Alert.alert(
      'User Not Valid',
      'Sorry That is an Invalid UserName',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }
  const vercodeMutation = ``;
  const handlePress = () => {
    const devVerCode = `mutation { authyVerifyDev( username: "${props.username}", code: "${vercode}" ) { token }}`
    props.doLogin(devVerCode)
    props.navigation.navigate('LoginChecker')
  };

  const goBack = () =>{
      props.navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Text>Please Verify Your Code</Text>
      <TextInput
        style={styles.textBox}
        placeholder="Verification Code"
        name="vercode"
        id="vercode"
        value={vercode}
        autoCapitalize="none"
        onChangeText={setVercode}
      />
      <Button onPress={handlePress} title="Login" />
      <Text>Didn't get the code? Try Again!</Text>
      <Button onPress={goBack} title="Go Back" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    // fontSize: 30,
    height: 40
  },
  tO: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 30,
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
    username: state.authReducer.username
  })
export default connect(mapStateToProps, {doLogin})(LoginVerify)