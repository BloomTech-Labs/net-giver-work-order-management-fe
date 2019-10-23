import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
// import { doSignIn } from '../../store/actions/authActions';sd 10/23/2019
// Needs Login Form / Function
// import { connect } from 'react-redux'; sd 10/23/2019
import { Button, InputItem } from '@ant-design/react-native';
import {styles} from '../../components/Styles'

const Login = (props) => {
  const [username, setUsername] = useState();
  const [token, setToken] = useState();

  function resetToDashboard() {
    props.navigation.navigate('Dashboard');
  }

  const submit = () => {
    const query = `mutation{signIn(login:"${username}"){  token   user {     username     authyId   } }} `;
    const queryDev = `mutation { signInDev( username: "${username}" ) { username } }`
    
    axios({
      method: "post",
      url: "https://netgiver-stage.herokuapp.com/graphql",
      data: {
        query: queryDev
      }
    }).then(res => {
        console.log(res.data.data.signInDev.username)
        props.navigation.navigate('CheckUser', {username: res.data.data.signInDev.username})
    });
  };

  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>ADD LOGO</Text>

      <Text style={styles.welcome}>Sign In</Text>
      <Text>And leave your paperwork behind!</Text>
      <TextInput
        
        style={styles.loginTextInput}
        placeholder="User Name"
        name="username"
        id="username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <Button style={styles.button} onPress={submit}>
        Sign In
      </Button>
      <Text style={styles.marginTop}>Don't Have an Account?</Text>
      <Button onPress={() => props.navigation.navigate('SignUp')} style={styles.button}>Sign Up</Button>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Go Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   button:{
//     backgroundColor: '#006E13',
//     // border: 1px solid #EDF1F3;
//     // boxSizing: 'border-box',
//     borderRadius: 4, 
//     // width:400,
//     alignSelf: 'stretch',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   link: {
//     fontSize: 16,
//     textAlign: 'center',
//     margin: 10
//   },
//   textBox: {
//     borderWidth: 1,
//     borderColor: '#000',
//     margin: 5,
//     // fontSize: 30,
//     height: 40
//   }
// });
// export default connect(
//   null,
//   { doSignIn }
// )(Login); sd 10/23/2019


export default Login;