import React, { useState, useRef } from "react";
// import { useDispatch } from 'react-redux'
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper";
// import { doSignup} from "../store/actions/authActions";
import * as Yup from "yup";
//import Camera from "../../components/camera/Camera";
import CameraExample from "../../components/camera/CameraExample";
import { isUpdateExpression } from "@babel/types";
//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (role, picture, authId??)
//  Formatting and styling
const Signup = props => {
  const [current, setCurrent] = useState(0);
  var [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: ""
  });
  const [disabled, setDisabled] = useState(false);
  const swipeRef = useRef();
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const pages = [
    // {
    //   name: "email",
    //   slideTitle: "Welcome to Netgiver!",
    //   text: "We just need to get some info before you get started",
    //   text2: "Please enter your email:",
    //   keyboard: "email-address",
    //   placeholder: "Email",
    //   schema: {
    //     email: Yup.string()
    //       .email("Must be a valid email.")
    //       .required("Email is required.")
    //   }
    // },
    // {
    //   name: "username",
    //   slideTitle: "Welcome to Netgiver!",
    //   text: "We just need to get some info before you get started",
    //   text2: "Please enter your username:",
    //   placeholder: "username",
    //   schema: {
    //     username: Yup.string().min(2).max(50).required("Username is required.")
    //   }
    // },
    // {
    //   name: "phone",
    //   slideTitle: "Welcome to Netgiver!",
    //   text: "",
    //   text2: "Please enter your phone number:",
    //   placeholder: "Phone Number",
    //   keyboard: "phone-pad",
    //   schema: {
    //     phone: Yup.string()
    //       .matches(phoneRegExp, "Phone number is not valid")
    //       .required("Phone number is required.")
    //   }
    // },
    {
      type: "photo"
    }
  ];

  function handleSubmit() {
    var { username, email, phone } = formValues;
    var password = "12512"; //test password;
    var newUser = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}" ) { token user {id} } }`;
    console.log("final values", formValues); // TODO : do something with this <---
  }
  const handleNext = values => {
    //this function will set page to the next page when schema passes and change state
    setFormValues({ ...formValues, ...values });
    swipeRef.current.scrollBy(1, true);
    setCurrent(current + 1);
  };
  function Form(slide) {
    var schema = Yup.object().shape(this.schema);
    return (
      <Formik
        onSubmit={(values, formikBag) => {
          formikBag.setSubmitting(false);
          handleNext(values, formikBag);
        }}
        validationSchema={schema}
        initialValues={{
          [this.name]: ""
        }}
        render={props => {
          return slide.call(this, props);
        }}
      />
    );
  }
  function Slide(props) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Swiper
          ref={swipeRef}
          style={styles.wrapper}
          showsButtons={false}
          disableNextButton={disabled}
          loop={false}
          buttonWrapperStyle={{
            position: "relative",
            marginVertical: 80,
            paddingHorizontal: 0
          }}
        >
          {this.type === "photo"
            ? <LastSlide {...props} />
            : <View style={styles.slide}>
                <Text style={styles.title}>
                  {" "}{this.slideTitle}{" "}
                </Text>

                <Text style={styles.text}>
                  {" "}{this.text}{" "}
                </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>
                    {" "}{this.text2}{" "}
                  </Text>
                  <TextInput
                    key={this.name + this.id}
                    name={this.name}
                    value={props.values[this.name]}
                    keyboardType={this.keyboard}
                    onChangeText={props.handleChange(this.name)}
                    placeholder={this.placeholder}
                    style={styles.input}
                  />
                  <Text>
                    {props.touched[this.name] && props.errors[this.name]
                      ? props.errors[this.name]
                      : null}
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      props.handleSubmit(props.values);
                    }}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>}
        </Swiper>
      </KeyboardAvoidingView>
    );
  }
  function LastSlide(props) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>Phone</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Please select a profile photo:</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              props.navigation.navigate("CameraExample", { from: "Signup" })}
          >
            <Text style={styles.buttonText}>Use the Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
};
const styles = StyleSheet.create({
  wrapper: {},
  container: { flex: 1 },
  inputContainer: {
    marginTop: 50,
    width: "100%",
    paddingHorizontal: 10
  },
  input: {
    width: "100%",
    backgroundColor: "#EDF1F3",
    marginVertical: 30,
    paddingVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1
  },
  buttonText: {
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    color: "white"
  },
  buttonStyle: {
    padding: 2,
    backgroundColor: "#006E13",
    alignItems: "center",
    borderRadius: 4,
    width: "100%"
  },
  btnNext: {
    color: "green"
  },
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },

  title: {
    color: "#282424",
    fontSize: 26,

    marginTop: "10%",
    textAlign: "center",
    paddingBottom: 3
  },
  text: {
    color: "#282424",
    fontSize: 16,
    textAlign: "center"
  }
});
export default Signup;
