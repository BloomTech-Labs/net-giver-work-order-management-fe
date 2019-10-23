import React from "react";
import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login/Login";
import UserChecker from "../screens/Login/UserChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import LoginChecker from "../screens/Login/LoginChecker";
import Signup from "../screens/Login/Signup";
import Camera from '../components/camera/Camera';

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
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        title: "Verify User"
      }
    },
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
    },
    Camera: {
      screen: Camera
    }
  },
  config
);

export default AuthStackNavigator;
