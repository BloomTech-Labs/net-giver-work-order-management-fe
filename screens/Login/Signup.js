import React, { useState, useRef, useContext, useEffect } from "react";
import { Formik } from 'formik';
import { 
          StyleSheet,
          Text,
          Image,
          View,
          TextInput,
          KeyboardAvoidingView,
          TouchableOpacity
        } from "react-native";
import Swiper from 'react-native-swiper';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../../context/userState";

//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (role, picture, authId??)
//  Formatting and styling
const Signup = (props) => {
  // Need to clean up a lot of this code - was plowing ahead towards a solution & mvp.
  // const [newUser, setNewUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState();
  const [photoUri, setPhotoUri] = useState();
  const [current, setCurrent] = useState(0);
  const { user, addUser } = useContext(UserContext)
  const swipeRef = useRef();

  //TESTING -- auto fill form 
  let i = Math.random()
  const newUser = {username: `foo${i}`, email: `foo${i}@aol.com`, phone: '5126369874'}

  useEffect(() => {
    if(user.reg_complete === true){
    props.navigation.navigate('Main')
    }
  }, [user.reg_complete]);


  // handlers
  const onInputChange = (name, text) => {
    const updatedUser = { ...newUser, [name]: text };
    setNewUser(updatedUser)
  };

  const handlePhoto = (uri) => {
    setPhotoUri(uri)
  }

  const handleSubmit = () => {
    const photo = photoUri
    const { username, email, phone } = newUser
    console.log('NEWUSER', newUser)
    const password = 123456 //temp password for testing
    const query = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}" ) { token user {id} } }`
    const res = addUser(query, photo); 
    console.log('SIGNUP', res);
  };

  const handleClick = () => {
    swipeRef.current.scrollBy(1, true)
    setCurrent(current + 1)
  }

  // components
  const PhotoInput = () => {
    return (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => props.navigation.navigate('Camera', {from:'Signup', callback:handlePhoto})}
      >
        {!photoUri
          ? <Ionicons
              name="md-camera"
              color="white"
              size={90}
            />
          : <Image
              style={{
                alignSelf: 'center',
                width: 200,
                height: 200,
                borderRadius: 200/2,
              }}
              source={{ uri: photoUri }}
              resizeMode="cover"
          />
        }
      </TouchableOpacity>
    )
  }

  const pages = [
    {
      type: "text",
      slideTitle: "Welcome to Netgiver!",
      text: "We just need to get some info before you get started",
      text2: "Please enter your email:",
      name: "email",
      keyboard: "email-address",
      placeholder: "Email",
      button: "Next"
    },
    {
      type: "text",
      slideTitle: "Welcome to Netgiver!",
      text: "We just need to get some info before you get started",
      text2: "Please enter your username:",
      name: "username",
      placeholder: "username",
      button: "Next"
    },
    {
      type: "text",
      slideTitle: "Welcome to Netgiver!",
      text: "",
      text2: "Please enter your phone number:",
      name: "phone",
      placeholder: "Phone Number",
      keyboard: "phone-pad",
      button: "Next"
    },
    {
      type: "photo",
      text: "Tap to add",
      topComponent: <PhotoInput />,
      button: "Submit"
    }
  ]
  
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Formik
        onSubmit={values => console.log(values)}
        validationSchema={SignupSchema}
        initialValues={{ email: '', username: '', phone: '' }}
        >
        <Swiper 
          ref={swipeRef}
          style={styles.wrapper}
          showsButtons={false}
          disableNextButton={disabled}
          loop={false}
          buttonWrapperStyle={{position: "relative", marginVertical: 80, paddingHorizontal: 0}}
        >
          {pages.map((input, index) =>  {
            return (
              <View style={styles['slide' + ++index]} key={'slide' + input.id}>
                {input.topComponent}
                {input.slideTitle &&
                  <Text style={styles.title}> {input.slideTitle} </Text>
                }
                <Text style={styles.text}> {input.text} </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}> {input.text2} </Text>
                  {input.type === 'photo'
                    ? <></>
                    : <TextInput
                        key={input.name + input.id}
                        name={input.name}
                        value={newUser[input.name]}
                        keyboardType={input.keyboard}
                        onChangeText={(text) => onInputChange(input.name, text)}
                        placeholder={input.placeholder}
                        style={styles.input}
                      />
                  }
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => input.button === "Submit" ? handleSubmit() : handleClick()}
                  >
                    <Text style={styles.buttonText}>{input.button}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )})}
        </Swiper>
      </Formik>
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
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    backgroundColor: '#EDF1F3',
    marginVertical: 30,
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
    padding: 10,
    color: 'white'
  },
buttonStyle: {
  padding:2,
  backgroundColor: '#006E13',
  alignItems: 'center',
  borderRadius:4,
  width: '100%',
  },
btnNext: {
  color: 'green'
},
  slide1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  slide2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  slide3: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  title: {
    color: '#282424',
    fontSize: 26,
    marginTop: '10%',
    textAlign: 'center',
    paddingBottom: 3,
  },
  text: {
    color: '#282424',
    fontSize: 16,
    textAlign: 'center',
  }, 
  photoContainer: {
    width: 200,
    height: 200,
    borderWidth: 6,
    borderRadius: 200/2,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
    alignSelf: 'center',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
})
export default Signup