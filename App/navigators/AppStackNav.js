import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import FirstName from '../screens/FirstName'
import LoginChecker from '../screens/LoginChecker'
import LoginVerify from '../screens/LoginVerify'

const AppStackNav = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Login: {
      screen: Login,
    },
    LoginVerify: {
      screen: LoginVerify,
    },
    LoginChecker:{
      screen: LoginChecker,
    },
    Signup: {
      screen: Signup,
    },
    FirstName: {
      screen: FirstName,
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default AppStackNav;