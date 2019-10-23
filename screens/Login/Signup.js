import React, { useState, useRef } from "react";
// import { useDispatch } from 'react-redux' sd 10/23/2019
import { 
          StyleSheet,
          Text,
          View,
          TextInput,
          KeyboardAvoidingView,
          TouchableOpacity
        } from "react-native";
import Swiper from 'react-native-swiper';
// import { doSignup} from "../store/actions/authActions"; sd 10/23/2019

//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (password, role, picture, authId??)
//  Formatting and styling

const Signup = (props) => {

  // Need to clean up a lot of this code - was plowing ahead towards a solution & mvp.
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState();
  const [current, setCurrent] = useState(0);
  // const dispatch = useDispatch(); sd 10/23/2019

  // Validation stuff not built in to components yet
  const validateInput = (name, text) => {
    if(name === 'username'){
      return /^[a-zA-Z \.\-]{1,50}$/g.test(text);
    }
    if(name === 'email'){
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text);
    }
    if(name === 'phone'){
      return /^\d{10}$/.test(text);
    }
  }

  const onInputChange = (name, text, validator) => {
    setErr(() =>validateInput(name, text))
    setUser({ ...user, [name]: text})
  };

  const handleSubmit = () => {
    console.log('user', user)
    const { username, email, phone } = user
    const password = 123456 //temp password for testing
    const newUser = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}" ) { token user {id} } }`
    // dispatch(doSignup(newUser))
  };

  const swipeRef = useRef();

  const handleClick = () => {
    console.log(swipeRef.current.state)
    swipeRef.current.scrollBy(1, true)
    setCurrent(current + 1)
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Swiper 
      ref={swipeRef}
      style={styles.wrapper}
      showsButtons={false}
      disableNextButton={disabled}
      loop={false}
      buttonWrapperStyle={{position: "relative", marginVertical: 80, paddingHorizontal: 0}}
    >
      
      <View style={styles.slide1}>
        <Text style={styles.title}>Welcome to Netgiver!</Text>
        <Text style={styles.text}>We just need to get some info before you get started</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Please enter your email:</Text>
          <TextInput
            name='email'
            value={user.email}
            keyboardType='email-address'
            onChangeText={(text) => onInputChange('email', text) }
            placeholder='Email'
            style={styles.input}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={() => handleClick()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.slide2}>
        <Text style={styles.title}>Username</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Please enter your username:</Text>
          <TextInput
            name='username'
            value={user.username}
            keyboardType='default'
            onChangeText={(text) => onInputChange('username', text) }
            placeholder='Username'
            style={styles.input}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={() => handleClick()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.slide3}>
      <Text style={styles.title}>Username</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Please enter your phone number:</Text>
          <TextInput
            name='phone'
            value={user.phone}
            keyboardType='phone-pad'
            textContentType='telephoneNumber'
            dataDetectorTypes='phoneNumber'
            onChangeText={(text) => onInputChange('phone', text) }
            placeholder='Phone'
            style={styles.input}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
  </Swiper>
  </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
  },
  container: {flex: 1},
  inputContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 70,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 10
  },
buttonStyle: {
  padding:5,
  backgroundColor: '#DDDDDD',
  alignItems: 'center',
  borderRadius:1
  },
btnNext: {
  color: 'green'
},
  slide1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: '10%',
    textAlign: 'center',
    paddingBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }
})
export default Signup