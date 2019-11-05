import { StyleSheet } from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import * as Yup from "yup";

export const signupstyles = StyleSheet.create({
  wrapper: {},
  container: { flex: 1 },
  inputContainer: {
    marginTop: -5,
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center"
  },

  slide0: {
    //backgroundColor: '#008000',
    justifyContent: "flex-start",
    alignItems: "center"
  },

  slideTitle: {
    fontWeight: "bold"
  },

  logo: {
    borderWidth: 2,
    position: "absolute",
    left: "auto",
    right: "auto",
    top: "9.15%",
    bottom: "73.91%"
  },

  slide1: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100
  },

  slide2: {
    flexDirection: "column",
    marginTop: 100
  },

  input: {
    width: "100%",
    backgroundColor: "#EDF1F3",
    marginVertical: 20,
    marginBottom: 45,
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
    marginVertical: -20,
    backgroundColor: "#009900",
    alignItems: "center",
    borderRadius: 4,
    width: "100%"
  },
  btnNext: {
    color: "#009900"
  },
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },

  title: {
    color: "#282424",
    marginTop: "10%",
    fontSize: 22,
    fontWeight: "bold",

    //marginVertical: 80,
    textAlign: "center"
    //paddingBottom: 3,
  },
  text: {
    color: "#282424",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold"
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderWidth: 6,
    borderRadius: 200 / 2,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
    alignSelf: "center",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const pages = [
  {
    image: true,
    type: "text",
    name: "phone",
    slideTitle: "Sign Up",
    text: "And leave your paperwork behind!",
    keyboard: "phone-pad",
    placeholder: "Enter your Phone Number",
    button: "Get Started",
    text3: "Contact The Net Giver Team",
    schema: {
      phone: Yup.string()
        .min(10, "Enter 10 digit phone number")
        .max(10, "Enter 10 digit phone number")
        .required("Phone Required")
    }
  },
  {
    type: "text",
    name: "Number Verification",
    slideTitle: "We need to verify your phone number",
    text: "We just sent a one-time code to",
    // text2: formValues['phone'],
    placeholder: "6-digit code",
    button: "Submit Code",
    text3: "Contact The Net Giver Team"
    // schema: {
    //   username: Yup.string().min(2).max(50).required('Username is required.'),
    // }
  },
  {
    type: "text",
    name: "email",
    slideTitle: "Email",
    text: "Email",
    // text2: formValues['email'],
    placeholder: "enter email",
    button: "Next"
    // schema: {
    //   username: Yup.string().min(2).max(50).required('Username is required.'),
    // }
  },
  {
    name: "username",
    slideTitle: "Welcome to Netgiver!",
    text: "We just need to get some info before you get started",
    text2: "Please enter your username:",
    placeholder: "username",
    button: "Next"
    // schema: {
    //   username: Yup.string().min(2).max(50).required('Username is required.'),
    // }
  },
  {
    type: "photo",
    slideTitle: "Create your Profile",
    text: "Tap to add",
    name: "fullname",
    name2: "email",
    // topComponent: <PhotoInput />,
    placeholder: "Full Name",
    placeholder2: "Email",
    button: "Submit"
  }
];
