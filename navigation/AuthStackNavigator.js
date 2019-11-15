import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login/Login";
import UserChecker from "../screens/Login/UserChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import LoginChecker from "../screens/Login/LoginChecker";
import CameraModule from "../components/camera/Camera";
import Email from "../screens/SignUp/Email.P3";
import Phone from "../screens/SignUp/Phone.P1";
import VerCode from "../screens/SignUp/VerCode.P2";
import PrivacyPolicy from "../screens/Policies/PrivacyPolicy";
import TermsOfService from "../screens/Policies/TermsOfService";
import Contact from "../screens/Contact";
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const AuthStackNavigator = createStackNavigator(
  {

    Login: {
      screen: Login,

      navigationOptions: {
        header: null
      }
    },
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        header: null
      }
    },
    VerifyLogin: {
      screen: LoginVerify,
      navigationOptions: {
        title: "Submit Code"
      }
    },
    CheckLogin: {
      screen: LoginChecker,
      navigationOptions: {
        header: null
      }
    },

    P1: {
      screen: Phone,
      navigationOptions: {
        title: "Sign Up"
      }
    },
    P2: {
      screen: VerCode,
      navigationOptions: {
        title: "Sign Up"
      }
    },
    P3: {
      screen: Email,
      navigationOptions: {
        title: "Sign Up"
      }
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        title: "Contact Us"
      }
    },

    CameraModule: {
      screen: CameraModule,
      navigationOptions: {
        title: "Take a Photo"
      }
    },
    TOS: {
      screen: TermsOfService,
      navigationOptions: {
        title: "Terms of Service"
      }
    },
    PP: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: "Privacy Policy"
      }
    },
  },
  config
);

AuthStackNavigator.initialRouteName = {
  Login
};
export default AuthStackNavigator;
