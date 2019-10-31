import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login/Login";
import UserChecker from "../screens/Login/UserChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import LoginChecker from "../screens/Login/LoginChecker";
import Signup from "../screens/Login/Signup";
import Camera from "../components/camera/Camera";

import { Platform } from "react-native";
import CameraExample from "../components/camera/CameraExample";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

//SEE USEAGE NOTES AT THE END OF FILE

const AuthStackNavigator = createStackNavigator(
  {
    //LOGIN SCREEN 10/24/2019 SD
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    //CHECK USER SCREEN CHECKS TO SEE IF A USER IS IN THE SYSTEM 10/24/2019 SD
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        header: null
      }
    },
    //AFTER CHECK USER YOU ARE SENT A TEXT WITH A VERIFICATION CODE AND THAT IS ENTERED ON VERIFYLOGIN 10/24/2019 SD
    VerifyLogin: {
      screen: LoginVerify,
      navigationOptions: {
        header: null
      }
    },
    //CHECKS TO MAKE SURE THAT YOU ARE A LOGGED IN USER 10/24/2019 SD
    CheckLogin: {
      screen: LoginChecker,
      navigationOptions: {
        header: null
      }
    },
    //SIGNUP PAGE 10/24/2019 SD
    SignUp: {
      screen: Signup,
      navigationOptions: {
        header: null
      }
    },
    Camera: {
      screen: Camera
    }
  },
  config
);

export default AuthStackNavigator;
