import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login/Login";
import UserChecker from "../screens/Login/UserChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import LoginChecker from "../screens/Login/LoginChecker";
import Signup from "../screens/Login/Signup";
import {Platform} from 'react-native'
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const AuthStackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },
    //CHECK USER SCREEN CHECKS TO SEE IF A USER IS IN THE SYSTEM 10/24/2019 SD
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        title: "Verify User"
      }
    },
    //AFTER CHECK USER YOU ARE SENT A TEXT WITH A VERIFICATION CODE AND THAT IS ENTERED ON VERIFYLOGIN 10/24/2019 SD
    VerifyLogin: {
      screen: LoginVerify,
      navigationOptions: {
        title: "Enter PIN"
      }
    },
    CheckLogin: {
      screen: LoginChecker,
      navigationOptions: {
        title: "Verify Pin"
      }
    },
    SignUp: {
      screen: Signup,
      navigationOptions: {
        title: "Sign Up"
      }
    }
  },
  config
);

export default AuthStackNavigator;
