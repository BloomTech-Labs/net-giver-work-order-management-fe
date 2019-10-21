import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../screens/Dashboard";
import AppStackNav from "./AppStackNav";

// THIS IS THE ROOT NAVIGATOR IT CONNECTS THE NAVIGATION COMPONENTS SD 10/21/2019
const RootNav = createStackNavigator({
  // Guest: {
  //SCREEN / COMPONENT TO BE RENDERED SD 10/21/2019
  //   screen: AppStackNav,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  Dashboard: {
    screen: Dashboard
  }
});

export default RootNav;
