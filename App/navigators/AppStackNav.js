import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup";
import LoginChecker from "../screens/Login/LoginChecker";
import LoginVerify from "../screens/Login/LoginVerify";
import UserChecker from "../screens/Login/UserChecker";

//THIS IS THE APP STACK NAVIGATOR SD 10/21/2019
// IT CAN BE THOUGHT OF AS GOING THROUGH A STACK OF PAPERS SD 10/21/2019
//THIS IS WHERE ALL OF THE COMPONENETS THAT DO NOT NEED TO BE AUTHENTICATED ARE RENDERED SD 10/21/2019
const AppStackNav = createStackNavigator(
  {
    Home: {
      //SCREEN / COMPONENT TO BE RENDERED SD 10/21/2019
      screen: Home
    },
    Login: {
      screen: Login
    },
    UserChecker: {
      screen: UserChecker
    },
    LoginVerify: {
      screen: LoginVerify
    },
    LoginChecker: {
      screen: LoginChecker
    },
    Signup: {
      screen: Signup
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default AppStackNav;
