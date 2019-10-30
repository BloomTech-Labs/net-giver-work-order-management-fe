import React, { useState, useRef } from "react";
<<<<<<< HEAD
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import Swiper from "react-native-swiper";
import CameraExample from "../../components/camera/CameraExample";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export const LinearGradient = undefined;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Signup = props => {
  const initialState = {
    isLoading: false,
    selectedType: null,
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    emailValid: true,
    passwordValid: true,
    usernameValid: true,
    confirmationPasswordValid: true
  };

  const [user, setUser] = useState(initialState);
  //const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState();
  const [current, setCurrent] = useState(0);
  // const dispatch = useDispatch();

  const signup = () => {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = validateUsername();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmationPasswordValid = validateConfirmationPassword();
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      setUser({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setUser({ isLoading: false });
        Alert.alert("🎸", "You rock");
      }, 1500);
    }
  };

  const validateUsername = () => {
    const { username } = user;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    setUser({ usernameValid });
    usernameValid || usernameInput.shake();
    return usernameValid;
  };

  const validateEmail = () => {
    const { email } = user;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    setUser({ emailValid });
    emailValid || emailInput.shake();
    return emailValid;
  };

  const validatePassword = () => {
    const { password } = user;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    setUser({ passwordValid });
    passwordValid || passwordInput.shake();
    return passwordValid;
  };

  const validateConfirmationPassword = () => {
    const { password, confirmationPassword } = user;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    setUser({ confirmationPasswordValid });
    confirmationPasswordValid || confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  };

  const setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || setUser({ selectedType });

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={styles.formContainer}
      >
        <Text style={styles.signUpText}>Sign up</Text>
        <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
        <View style={styles.userTypesContainer}>
          <UserTypeItem
            label="COOL"
            labelColor="#ECC841"
            // image={USER_COOL}
            onPress={() => setSelectedType("parent")}
            selected={user.selectedType === "parent"}
          />
          <UserTypeItem
            label="STUDENT"
            labelColor="#2CA75E"
            // image={USER_STUDENT}
            onPress={() => setSelectedType("child")}
            selected={user.selectedType === "child"}
          />
          <UserTypeItem
            label="HARRY POTTER"
            labelColor="#36717F"
            // image={USER_HP}
            onPress={() => setSelectedType("teacher")}
            selected={user.selectedType === "teacher"}
          />
        </View>
        <View style={{ width: "80%", alignItems: "center" }}>
          <FormInput
            refInput={input => (usernameInput = input)}
            icon="user"
            value={user.username}
            onChangeText={username => setUser({ username })}
            placeholder="Username"
            returnKeyType="next"
            errorMessage={
              user.usernameValid ? null : "Your username can't be blank"
            }
            onSubmitEditing={() => {
              validateUsername();
              emailInput.focus();
            }}
          />
          <FormInput
            refInput={input => (emailInput = input)}
            icon="envelope"
            value={user.email}
            onChangeText={email => setUser({ email })}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            errorMessage={
              user.emailValid ? null : "Please enter a valid email address"
            }
            onSubmitEditing={() => {
              validateEmail();
              passwordInput.focus();
            }}
          />
          <FormInput
            refInput={input => (passwordInput = input)}
            icon="lock"
            value={user.password}
            onChangeText={password => setUser({ password })}
            placeholder="Password"
            secureTextEntry
            returnKeyType="next"
            errorMessage={
              user.passwordValid ? null : "Please enter at least 8 characters"
            }
            onSubmitEditing={() => {
              validatePassword();
              confirmationPasswordInput.focus();
            }}
          />
          <FormInput
            refInput={input => (confirmationPasswordInput = input)}
            icon="lock"
            value={user.confirmationPassword}
            onChangeText={confirmationPassword =>
              setUser({ confirmationPassword })}
            placeholder="Confirm Password"
            secureTextEntry
            errorMessage={
              user.confirmationPasswordValid
                ? null
                : "The password fields are not identics"
            }
            returnKeyType="go"
            onSubmitEditing={() => {
              validateConfirmationPassword();
              signup();
            }}
          />
        </View>
        <Button
          loading={user.isLoading}
          title="SIGNUP"
          containerStyle={{ flex: -1 }}
          buttonStyle={styles.signUpButton}
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: [1, 0],
            end: [0.2, 0]
          }}
          ViewComponent={LinearGradient}
          titleStyle={styles.signUpButtonText}
          onPress={signup}
          disabled={user.isLoading}
        />
      </KeyboardAvoidingView>
      <View style={styles.loginHereContainer}>
        <Text style={styles.alreadyAccountText}>Already have an account.</Text>
        <Button
          title="Login here"
          titleStyle={styles.loginHereText}
          containerStyle={{ flex: -1 }}
          buttonStyle={{ backgroundColor: "transparent" }}
          underlayColor="transparent"
          onPress={() => Alert.alert("🔥", "You can login here")}
        />
      </View>
    </ScrollView>
  );
};

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon name={icon} type={"simple-line-icon"} color="#7384B4" size={18} />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  );
};

=======
// import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import Swiper from 'react-native-swiper';
// import { doSignup} from "../store/actions/authActions";
import * as Yup from 'yup';
import Camera from '../../components/camera/Camera';
import { isUpdateExpression } from "@babel/types";
//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (role, picture, authId??)
//  Formatting and styling
const Signup = (props) => {

  const [current, setCurrent] = useState(0);
  var [formValues, setFormValues] = useState({
    username:"",
    email:"",
    phone:""
  })
  const [disabled, setDisabled] = useState(false);
  const swipeRef = useRef();
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  const pages = [
    {
      name: "email",
      slideTitle: "Welcome to Netgiver!",
      text: "We just need to get some info before you get started",
      text2: "Please enter your email:",
      keyboard: "email-address",
      placeholder: "Email",
      schema: {
        email: Yup.string().email("Must be a valid email.").required("Email is required."),
      }
    },
    {
      name: "username",
      slideTitle: "Welcome to Netgiver!",
      text: "We just need to get some info before you get started",
      text2: "Please enter your username:",
      placeholder: "username",
      schema: {
        username: Yup.string().min(2).max(50).required('Username is required.'),
      }
    },
    {
      name: "phone",
      slideTitle: "Welcome to Netgiver!",
      text: "",
      text2: "Please enter your phone number:",
      placeholder: "Phone Number",
      keyboard: "phone-pad",
      schema: {
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number is required."),
      }
    },
    {
      type:"photo"
    }
  ]


  function handleSubmit(){
    var { username, email, phone } = formValues;
    var password = "12512"//test password;
    var newUser = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}" ) { token user {id} } }`
    console.log("final values",formValues)// TODO : do something with this <---
  };
  const handleNext = (values) => {
    //this function will set page to the next page when schema passes and change state
    setFormValues({...formValues, ...values});
    swipeRef.current.scrollBy(1, true)
    setCurrent(current + 1)
  }
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
  function Slide(props) {

    return <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Swiper
        ref={swipeRef}
        style={styles.wrapper}
        showsButtons={false}
        disableNextButton={disabled}
        loop={false}
        buttonWrapperStyle={{ position: "relative", marginVertical: 80, paddingHorizontal: 0 }}
      >{
          (this.type === 'photo') ? <LastSlide {...props} />
            :
            <View style={styles.slide}>
              <Text style={styles.title}> {this.slideTitle} </Text>

              <Text style={styles.text}> {this.text} </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.text}> {this.text2} </Text>
                <TextInput
                  key={this.name + this.id}
                  name={this.name}
                  value={props.values[this.name]}
                  keyboardType={this.keyboard}
                  onChangeText={props.handleChange(this.name)}
                  placeholder={this.placeholder}
                  style={styles.input}
                />
                <Text >{
                  props.touched[this.name] &&  props.errors[this.name]
                  ? props.errors[this.name] : null
                }</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                  props.handleSubmit(props.values);
                }}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>}

      </Swiper>
    </KeyboardAvoidingView>
  }
  function LastSlide(props) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>
          Phone
    </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Please select a profile photo:
      </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => props.navigation.navigate('Camera', { from: 'Signup' })}>
            <Text style={styles.buttonText}>Use the Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {
             handleSubmit()
          }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  /*this switch statement will determine the this value for each form function call
    whats great about this is that now all you have to do is modify this switch case statement 
    and add to the variable pages if you want to add a screen
  */
  switch (current) {
    case 0:
      return Form.call(pages[0], Slide);
    case 1:
      return Form.call(pages[1], Slide);
    case 2:
      return Form.call(pages[2], Slide);
    case 3:
      return Form.call(pages[3], Slide);
  }

}
>>>>>>> 5dce913a4bb3553928ab0b622b1ebce4b1dd5c3f
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#293046",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "space-around"
  },
<<<<<<< HEAD
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  signUpText: {
    color: "white",
    fontSize: 28
    // fontFamily: "UbuntuLight"
  },
  whoAreYouText: {
    color: "#7384B4",
    // fontFamily: "UbuntuBold",
    fontSize: 14
  },
  userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    alignItems: "center"
  },
  userTypeItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5
  },
  userTypeItemContainerSelected: {
    opacity: 1
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100
  },
  userTypeLabel: {
    color: "yellow",
    // fontFamily: "UbuntuBold",
    fontSize: 11
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(110, 120, 170, 1)",
    height: 45,
    marginVertical: 10
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: "white",
    // fontFamily: "UbuntuLight",
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  },
  signUpButtonText: {
    // fontFamily: "UbuntuBold",
    fontSize: 13
  },
  signUpButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45
  },
  loginHereContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  alreadyAccountText: {
    // fontFamily: "UbuntuLightItalic",
    fontSize: 12,
    color: "white"
  },
  loginHereText: {
    color: "#FF9800",
    // fontFamily: "UbuntuLightItalic",
    fontSize: 12
=======
  container: { flex: 1 },
  inputContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 10,
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
    padding: 2,
    backgroundColor: '#006E13',
    alignItems: 'center',
    borderRadius: 4,
    width: '100%',
  },
  btnNext: {
    color: 'green'
  },
  slide: {
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
>>>>>>> 5dce913a4bb3553928ab0b622b1ebce4b1dd5c3f
  }
});

export default Signup;
