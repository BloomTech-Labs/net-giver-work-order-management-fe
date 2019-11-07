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
import Email from "../screens/SignUp/Email.P3";
import Phone from "../screens/SignUp/Phone.P1";
import Photo from "../screens/SignUp/Photo.P5";
import UserName from "../screens/SignUp/UserName.P4";
import VerCode from "../screens/SignUp/VerCode.P2";
import Pp from "../screens/Policy/Pp";
import Details from '../screens/WorkOrder/Details'
import ToS from "../screens/Policy/ToS";

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
    // //CHECK USER SCREEN CHECKS TO SEE IF A USER IS IN THE SYSTEM 10/24/2019 SD
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        header: null
      }
    },
    // //AFTER CHECK USER YOU ARE SENT A TEXT WITH A VERIFICATION CODE AND THAT IS ENTERED ON VERIFYLOGIN 10/24/2019 SD
    VerifyLogin: {
      screen: LoginVerify,
      navigationOptions: {
        header: null
      }
    },
    // //CHECKS TO MAKE SURE THAT YOU ARE A LOGGED IN USER 10/24/2019 SD
    CheckLogin: {
      screen: LoginChecker,
      navigationOptions: {
        header: null
      }
    },
    //SIGNUP PAGE 10/24/2019 SD
    P1: {
      screen: Phone,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    P2: {
      screen: VerCode,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    P3: {
      screen: Email,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    P4: {
      screen: UserName,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    P5: {
      screen: Photo,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    //PRIVACY POLICY PAGE 11/1/2019 KS/SD
    PP: {
      screen: Pp,
      navigationOptions: {
      title:'Privacy Policy'
      }
    },

     //PRIVACY POLICY PAGE 11/1/2019 KS/SD
    TOS: {
      screen: ToS,
      navigationOptions: {
        title:'Terms of Service'
      }
    },
    //PRIVACY POLICY PAGE 11/1/2019 KS/SD
    PP: {
      screen: Pp,
      navigationOptions: {
      title:'Privacy Policy'
      }
    },

     //PRIVACY POLICY PAGE 11/1/2019 KS/SD
    TOS: {
      screen: ToS,
      navigationOptions: {
        title:'Terms of Service'
      }
    },
    Camera: {
      screen: Camera
    },

    //DETAILS PAGE 11/4/2019 KS
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Details'
      }
    }
  },
  config
);

export default AuthStackNavigator;
