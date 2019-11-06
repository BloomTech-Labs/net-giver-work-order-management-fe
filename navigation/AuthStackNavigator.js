import React from 'react'
import {
    Platform,
    Text,
    View,
    Button,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login/Login'
import UserChecker from '../screens/Login/UserChecker'
import LoginVerify from '../screens/Login/LoginVerify'
import LoginChecker from '../screens/Login/LoginChecker'
import Signup from '../screens/Login/Signup'
import CameraModule from '../components/camera/Camera'
import Email from '../screens/SignUp/Email.P3'
import Phone from '../screens/SignUp/Phone.P1'
import VerCode from '../screens/SignUp/VerCode.P2'
import PrivacyPolicy from '../screens/Policies/PrivacyPolicy'
import TermsOfService from '../screens/Policies/TermsOfService'
import Contact from '../screens/Contact'
const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
})

//SEE USEAGE NOTES AT THE END OF FILE

const AuthStackNavigator = createStackNavigator(
    {
        //LOGIN SCREEN 10/24/2019 SD
        // Login: {
        //   screen: Login,
        //   navigationOptions: {
        //     header: null
        //   }
        // },
        // //CHECK USER SCREEN CHECKS TO SEE IF A USER IS IN THE SYSTEM 10/24/2019 SD
        // CheckUser: {
        //   screen: UserChecker,
        //   navigationOptions: {
        //     header: null
        //   }
        // },
        // //AFTER CHECK USER YOU ARE SENT A TEXT WITH A VERIFICATION CODE AND THAT IS ENTERED ON VERIFYLOGIN 10/24/2019 SD
        // VerifyLogin: {
        //   screen: LoginVerify,
        //   navigationOptions: {
        //     header: null
        //   }
        // },
        // //CHECKS TO MAKE SURE THAT YOU ARE A LOGGED IN USER 10/24/2019 SD
        // CheckLogin: {
        //   screen: LoginChecker,
        //   navigationOptions: {
        //     header: null
        //   }
        // },
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
                title: 'Sign Up',
            },
        },
        Contact: {
            screen: Contact,
            navigationOptions: {
                title: 'Contact Us',
            }
        },
      
        CameraModule: {
            screen: CameraModule,
            navigationOptions: {
                title: 'Take a Photo',
            },
        },
        TOS: {
            screen: TermsOfService,
            navigationOptions: {
                title: 'Terms of Service',
            },
        },
        PP: {
            screen: PrivacyPolicy,
            navigationOptions: {
                title: 'Privacy Policy',
            },
        },
    },
    config
)

export default AuthStackNavigator
