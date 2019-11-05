import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login/Login";
import UserChecker from "../screens/Login/UserChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import LoginChecker from "../screens/Login/LoginChecker";
import Signup from "../screens/Login/Signup";
import Camera from '../components/camera/Camera';
import Pp from '../screens/Policy/Pp'
import {Platform} from 'react-native'
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
       header:null
      }
    },
    //CHECK USER SCREEN CHECKS TO SEE IF A USER IS IN THE SYSTEM 10/24/2019 SD
    CheckUser: {
      screen: UserChecker,
      navigationOptions: {
        header:null
      }
    },
    //AFTER CHECK USER YOU ARE SENT A TEXT WITH A VERIFICATION CODE AND THAT IS ENTERED ON VERIFYLOGIN 10/24/2019 SD
    VerifyLogin: {
      screen: LoginVerify,
      navigationOptions: {
        header:null
      }
    },
    //CHECKS TO MAKE SURE THAT YOU ARE A LOGGED IN USER 10/24/2019 SD
    CheckLogin: {
      screen: LoginChecker,
      navigationOptions: {
        header:null
      }
    },
    //SIGNUP PAGE 10/24/2019 SD
    SignUp: {
      screen: Signup,
      navigationOptions: {
        header:null
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
      screen: WorkOrderDetails,
      navigationOptions: {
        title: 'Work Order Details'
      }
    }
  },
  config
);

export default AuthStackNavigator;


//USEAGE NOTES
// Example:{
//   screen: ExampleDifName,
//   navigationOptions:{
//     title:"Example Title Page",
//     header: null
//   }
// },

// THIS IS THE VARIABLE YOU WILL CALL WHEN YOU LOGIN props.navigation.navigate('Example', {props: props.canBePassedOnNavigate})
//Example:{
// THIS IS THE SCREEN THAT WILL RENDER IT MUST BE IMPORTED
//  screen: ExampleNameCanBeDifferentFromVariable,
// THIS IS WHERE YOU WILL DEFINE DIFFERENT OPTIONS FOR THE NAVIGATION BAR
//  naviagtionOptions:{
//    DISPLAYS NO TOP HEADER
//    header: null, 
//    WILL SET THE HEADER FOR THE PAGE
//    title: "Example Title Page", 
//    OTHER OPTIONS CAN BE FOUND IN THE REACT NATIVE DOCS
//  }
// },
//
//
//
// YOU CAN COMMENT OUT ALL SCREENS UP TO THE ONE THAT YOU ARE WORKING ON TO GET TO THE PAGE YOU ARE USING
//
//
//
//USEAGE END 10/25/2019 SD