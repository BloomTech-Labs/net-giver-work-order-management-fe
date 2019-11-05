import React, { useState, useRef, useContext, useEffect } from "react";
import { Formik } from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert, 
  ActivityIndicator
} from "react-native";
import { Button } from 'native-base'
import Swiper from 'react-native-swiper';
import { Overlay } from 'react-native-elements';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../../context/userState";
import { loginStyles } from '../../components/Styles';
import { isUpdateExpression } from "@babel/types";
//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (role, picture, authId??)
//  Formatting and styling
const Signup = (props) => {
  // Need to clean up a lot of this code - was plowing ahead towards a solution & mvp.
  // const [newUser, setNewUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [err, setErr] = useState();
  const [photoUri, setPhotoUri] = useState();
  const [current, setCurrent] = useState(0);
  const { user, addUser } = useContext(UserContext)
  const swipeRef = useRef();
  var [formValues, setFormValues] = useState({
    fullname:"",
    email:"",
    phone:"",
    
  })

  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

  //TESTING -- auto fill form 
  //let i = Math.random()
  //const formValues = {username: `foo${i}`, email: `foo${i}@aol.com`, phone: '7186369874'}

  useEffect(() => {
    // Need to add error handling
    if(user.reg_complete === true){
      Alert.alert(
        'User Added!',
        `User id: ${user.id}`,
        [
          {text: 'OK', onPress: () => props.navigation.navigate('Main')},
        ],
        {cancelable: false},
      );
    }
  }, [user.reg_complete]);


  // handlers
  const onInputChange = (name, text) => {
    const updatedUser = { ...formValues, [name]: text };
    console.log(updatedUser)
    setFormValues(updatedUser)
  };

  const handlePhoto = (uri) => {
    setPhotoUri(uri)
  }

  const handleSubmit = () => {
    setToggleOverlay(true);
    const photo = photoUri
    const { username, email, phone} = formValues
    const password = 123456 //temp password for testing
    const query = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}") { token user {id} } }`
  //   const textInputForm = <TextInput
  //   key={input.name + input.id}
  //   name={input.name}
  //   value={formValues[input.name]}
  //   keyboardType={input.keyboard}
  //   onChangeText={(text) => onInputChange(input.name, text)}
  //   placeholder={input.placeholder}
  //   style={styles.input}
  // />

    const res = addUser(query, photo); 
    console.log("final values",formValues)
  };
  
  const handleNext = (values) => {
    //this function will set page to the next page when schema passes and change state
    setFormValues({...formValues, ...values});
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
  const TextTos = () => {
    return (
      
     
        <><Text style={styles.textToS}>By pressing submit you agree to our </Text><Text style={styles.textToS}  onPress={()=> props.navigation.navigate('TOS')} >Terms of Service</Text><Text style={styles.textToS}> and</Text> <Text style={styles.textToS} onPress={()=> props.navigation.navigate('PP')}> Privacy Policy.</Text></>
      
      
    )
  }

  const pages = [

    {
      val: 1,
      image: true,
      type: "text",
      name: "phone",
      slideTitle: "Sign Up",
      text0: "And leave your paperwork behind!",
      // text2: "Please enter your email:",
      // keyboard: "email-address",
      keyboard: "phone-pad",
      placeholder: "Enter your Phone Number",
      button: "Get Started",
      text3: "Contact The Net Giver Team"       
      // keyboard: "phone-pad",
      // schema: {
      //   phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number is required."),
      // }
    },
    {
      val: 2,
      type: "text",
      name: "Number Verification",
      slideTitle: "We need to verify your phone number",
      text: "We just sent a one-time code to",
      // text2: formValues['phone'],
      placeholder: "6-digit code",
      button: "Sign Up",
      text3: "Contact The Net Giver Team"
      // schema: {
      //   username: Yup.string().min(2).max(50).required('Username is required.'),
      // }
    },
    
    // {
    //   type: "text",
    //   name: "email",
    //   slideTitle: "Email",
    //   text: "Email",
    //   // text2: formValues['email'],
    //   placeholder: "6-digit code",
    //   button: "Next",
    //   // schema: {
    //   //   username: Yup.string().min(2).max(50).required('Username is required.'),
    //   // }
    // },
    // {
    //   name: "username",
    //   slideTitle: "Welcome to Netgiver!",
    //   text: "We just need to get some info before you get started",
    //   text2: "Please enter your username:",
    //   placeholder: "username",
    //   button: "Next",
    //   // schema: {
    //   //   username: Yup.string().min(2).max(50).required('Username is required.'),
    //   // }
    // },
    {
      val: 3,
      type: "photo",
      slideTitle: "Create your Profile",
      text: "So your colleagues can recognize you!",
      name: 'fullname',
      name2: 'email',
      topComponent: <PhotoInput />,
      placeholder: "Full Name",
      placeholder2: "Email",
      button: "Submit",
      textToS: <TextTos />,
      text3: "Contact The Net Giver Team",
    },
    // {
      
    //   type: "createneworganization",
    //   slideTitle2: "Name Your Organization",
    //   SubTextTop: "You are almost done!",
    //   name: 'fullname',
    //   topComponent: <PhotoInput />,
    //   button: "Create a New Organization",
    //   button2: "Join an Existing Organization",
    //   text3: "Contact The Net Giver Team",
    // },
    // {
    //   type: "chooseoganization",
    //   slideTitle2: "Name Your Organization",
    //   SubTextTop: "You are almost done!",
    //   name: 'orgname',
    //   topComponent: <PhotoInput />,
    //   placeholder: "Organization Name",
    //   button: "Next",
    //   text3: "Contact The Net Giver Team",
    // }

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


  function Form(slide) {
    var schema = Yup.object().shape(this.schema);
    return <Formik
      onSubmit={(values, formikBag) => {
        formikBag.setSubmitting(false);
        handleNext(values, formikBag)
      }}
      validationSchema={schema}
      initialValues={{
        [this.name]:""
      }}
      render={props => {
        return slide.call(this, props);
      }}
    />
  }
  // function Slide(props) {

  //   return (
  //   <KeyboardAvoidingView style={styles.container} behavior="padding">
  //     <Swiper
  //       ref={swipeRef}
  //       style={styles.wrapper}
  //       showsButtons={false}
  //       disableNextButton={disabled}
  //       loop={false}
  //       buttonWrapperStyle={{ position: "relative", marginVertical: 80, paddingHorizontal: 0 }}
  //     >{
  //         (this.type === 'photo') ? <LastSlide {...props} />
  //           :
  //           <View style={styles['slide' + current]}>
  //             <Text style={styles.title}> {this.slideTitle} </Text>
  //             <Text style={styles.text}> {this.text2} </Text>
  //             <Text style={styles.text}> {this.text} </Text>
  //             <View style={styles.inputContainer}>
  //               <TextInput
  //                 key={this.name + this.id}
  //                 name={this.name}
  //                 value={props.values[this.name]}
  //                 keyboardType={this.keyboard}
  //                 onChangeText={props.handleChange(this.name)}
  //                 placeholder={this.placeholder}
  //                 style={styles.input}
  //               />
  //               <Text >{
  //                 props.touched[this.name] &&  props.errors[this.name]
  //                 ? props.errors[this.name] : null
  //               }</Text>
  //               <TouchableOpacity style={styles.buttonStyle} onPress={() => {
  //                 props.handleSubmit(props.values);
  //               }}>
  //                 <Text style={styles.buttonText}>Get Started</Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>}

  //     </Swiper>
  //   </KeyboardAvoidingView>
  // )
  // }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Overlay
        isVisible={toggleOverlay}
        onBackdropPress={() => setToggleOverlay(false)}
      >
        <>
          <Text>Some Random Message</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      </Overlay>
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
              <View style={[styles['slide' + ++index], styles['signUpWrapper']]} key={'slide' + input.id}>
                {input.image ? <Image  style={loginStyles.logo} source={require('../../components/Images/ng.png')}/> : null}
                
                <Text style={[styles.title, input.val === 2 ? {textAlign: 'left'} : null]}> {input.slideTitle} </Text>
                <Text style={[styles.text, input.val === 2 ? {textAlign: 'left', marginTop: 20, fontWeight: "bold"} : null]}>{input.text} </Text>
                {input.topComponent}
                {input.topComponent ? 
                  <Text style={[styles.text, {fontSize: 15}]}>Tap to add</Text>
                  :
                  null
                }
                {input.val === 2 ? 
                  <Text style={{fontSize: 17}}>+1{formValues.phone}</Text>
                  :
                  null
                }
                

                <View style={styles.inputContainer}>
                
                  <Text style={styles.text}> {input.text2} </Text>

                  <TextInput
                        key={input.name + input.id}
                        name={input.name}
                        value={formValues[input.name]}
                        keyboardType={input.keyboard}
                        onChangeText={(text) => onInputChange(input.name, text)}
                        placeholder={input.placeholder}
                        style={loginStyles.loginTextInput}
                      />
                  
                  {input.name2 
                    ? <TextInput
                        key={input.name2 + input.id}
                        name={input.name2}
                        value={formValues[input.name2]}
                        keyboardType={input.keyboard}
                        onChangeText={(text) => onInputChange(input.name2, text)}
                        placeholder={input.placeholder2}
                        style={[loginStyles.loginTextInput, {marginTop: 15}]}
                      /> 
                      : 
                      null

                  }
                  <Button
                    style={[loginStyles.buttons, {marginTop: 30}]}
                    onPress={() => input.button === "Submit" ? handleSubmit() : handleNext()}
                  >
                    <Text style={loginStyles.buttonText}>{input.button}</Text>
                  </Button>
                </View>
                <Text style={[loginStyles.footerText, {width: '100%', textAlign: 'center'}]}>Contact Netgiver Team</Text>
              </View>
              
                {input.textToS 
                  ? 
                  // <View style={styles.textToS}><Text> 
                  <Text>{input.textToS} </Text>
                  //{/* </Text></View> */}
                   : null}

              <Text style={styles.text3}> {input.text3} </Text>
            </View>
          )})}
      </Swiper>
    </Formik>
</KeyboardAvoidingView>
);


  /*this switch statement will determine the this value for each form function call
    whats great about this is that now all you have to do is modify this switch case statement 
    and add to the variable pages if you want to add a screen
  */
  // switch (current) {
  //   case 0:
  //     return Form.call(pages[0], Slide);
  //   case 1:
  //     return Form.call(pages[1], Slide);
  //   case 2:
  //     return Form.call(pages[2], Slide);
  //   case 3:
  //     return Form.call(pages[3], Slide);
  //   case 4:
  //   return Form.call(pages[4], Slide);
  // }

}
const styles = StyleSheet.create({
  wrapper: {
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 16
  },
  inputContainer: {
    marginTop: -5,
    width: '100%',
  },
  signUpWrapper: {
    paddingTop: 44,
    justifyContent: 'center'
  },
   slide0: {
    //backgroundColor: '#008000',
    
    justifyContent: 'flex-start',
    alignItems: 'center',
    
   },

   slideTitle: {
    fontWeight: 'bold',
   },
   slide1: {
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingTop: 100,
    alignItems: 'center',

    
   },

   slide2: {
     
    flexDirection: "column",
    marginTop: 40,
   },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    color: 'white'
  },
  buttonStyle: {
    padding: 4,
    marginVertical: -20,
    backgroundColor: '#009900',
    alignItems: 'center',
    borderRadius: 4,
    width: '100%',
  },
  btnNext: {
    color: '#009900'
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  slide3: {
    paddingTop: 20,
  },
  slide3: {
    marginTop: -30,
  },

  slide4: {
    paddingTop: 47,
  },

  textToS: {
    paddingTop: 20,
    alignItems: 'center',
  }, 

  title: {
    color: '#282424',
    marginTop: '10%',
    fontSize: 22,
    fontWeight: 'bold',
    //marginVertical: 80,
    textAlign: 'center',
    //paddingBottom: 3,
  },
  
  text: {
    color: '#282424',
    textAlign: 'center',
    fontSize: 17,
  }, 

  text0: {
    color: '#282424',
    textAlign: 'center',
    fontSize: 17,
    marginTop: -25,
    marginBottom: 10,
  }, 

    text3: {
      textAlign: 'center',
      marginTop: 35,
    },

    SubTextTop: {
      textAlign: 'center',
      marginTop: 10,
    },

  photoContainer: {
    width: 125,
    height: 125,
    borderWidth: 6,
    borderRadius: 200/2,
    borderColor: "#EDF1F3",
    backgroundColor: "#EDF1F3",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }, 
})
export default Signup

