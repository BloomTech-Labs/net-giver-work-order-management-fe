import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { doSignIn } from '../store/actions/authActions';
// Needs Login Form / Function
import { connect } from 'react-redux';
const Login = props => {
  const [username, setUsername] = useState();
  function resetToDashboard() {
    props.navigation.navigate('Dashboard');
  }

  const submit = () => {
    const query = ` mutation { signIn(   login: "${username}" ) {   token   user {     username     authyId   } }} `;

    // props.doSignIn(query)
    props.navigation.navigate('LoginVerify');
  };

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Login</Text>
      <TextInput
        style={styles.textBox}
        placeholder="User Name"
        name="username"
        id="username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <TouchableOpacity onPress={submit}>
        <Text style={[styles.link, { color: 'blue' }]}>Get Verified</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Go Back</Text>
      </TouchableOpacity>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    // fontSize: 30,
    height: 40
  }
});
export default connect(
  null,
  { doSignIn }
)(Login);
