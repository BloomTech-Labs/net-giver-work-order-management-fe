import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BarcodeScanner from "../components/BarCodeScanner";
import CameraExample from "../components/Camera";
import { Input, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
// NEED TO BUILD SIGN UP FORM

// username: String!
// email: String!
// role: String
// phone: String!
// picture: String

    //    <Text style={styles.welcome}>Signup</Text>
    //   <TouchableOpacity onPress={() => props.navigation.navigate('FirstName')}>
    //     <Text>First Name</Text>
    //     <CameraExample />
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => props.navigation.goBack()}>
    //     <Text style={styles.goBack}>Go Back</Text>
    //   </TouchableOpacity> 

const Signup = (props) => {

  //user obj to store form data
  const [user, setUser] = useState({});

  const onInputChange = (name, text) => {
    console.log(name, text)
    setUser({ ...user, [name]: text})
};

useEffect(() => {
  console.log('user changed ', user);
}, [user]);

  //Temp solution for input masking - will see if anyone else
  // wants to use a masking library
  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  return (
  <Onboarding
    onDone={() => console.log('done')}
    containerStyles={{ flex: 0, justifyContent: 'flex-start', marginTop: '10%' }}
    imageContainerStyles={{ paddingTop: 10,  }}
    pages={[
      {
        backgroundColor: '#003c8f',
        image: <Icon color="white" name="rocket" type="font-awesome" size={62} />,
        title: 'Welcome to Netgiver',
        subtitle: 'We just need to get some info before you get started.'
      },
      {
        backgroundColor: '#d32f2f',
        image: <Icon color="white" name="user-circle" type="font-awesome" size={62} />,
        title: 'Enter A Username For Your Account',
        subtitle: <Input
                    name='username'
                    value={user.username}
                    // onChangeText={(text) => setUser({ ...user, username: text})}
                    onChangeText={(text) => onInputChange('username', text) }
                    labelStyle={{color: '#fff'}}
                    label='Username'
                    inputStyle={{color: '#fff'}}
                    placeholder='Username'
                  />,
      },
      {
        backgroundColor: '#003c8f',
        image: <Text style={styles.welcome}>Welcome to Netgiver Work Order Management</Text>,
        title: 'Email',
        subtitle: <Input
                    name='email'
                    value={user.email}
                    keyboardType='email-address'
                    // onChangeText={(text) => setUser({...user, email: text})}
                    onChangeText={(text) => onInputChange('email', text) }
                    labelStyle={{color: '#fff'}}
                    label='Email'
                    inputStyle={{color: '#fff'}}
                    placeholder='Email'
                />,
      },
      {
        backgroundColor: '#999',
        image: <Text style={styles.welcome}>Welcome to Netgiver Work Order Management</Text>,
        title: 'Phone',
        subtitle: <Input
                    name='phone'
                    value={user.phone}
                    keyboardType='phone-pad'
                    onChangeText={(text) => onInputChange('phone', formatPhoneNumber(text)) }
                    labelStyle={{color: '#fff'}}
                    label='Phone'
                    inputStyle={{color: '#fff'}}
                    placeholder='Phone'
                    textContentType='telephoneNumber'
                    dataDetectorTypes='phoneNumber'
                    maxLength={14}
                />,
      },
    ]}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 26,
    textAlign: "center",
    margin: 10,
    color: '#424242'
  },
  goBack: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  }
});
export default Signup