import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';

const LoginVerify = (props) => {
  const [vercode, setVercode] = useState('');

  const vercodeMutation = ``;
  const handlePress = () => {
    props.doLogin(vercodeMutation);
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

export default LoginVerify;
