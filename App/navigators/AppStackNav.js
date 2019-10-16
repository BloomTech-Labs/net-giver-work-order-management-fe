import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup';
import LoginChecker from '../screens/Login/LoginChecker';
import LoginVerify from '../screens/Login/LoginVerify';
import UserChecker from '../screens/Login/UserChecker';

const AppStackNav = createStackNavigator(
  {
    Home: {
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
    },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default AppStackNav;
