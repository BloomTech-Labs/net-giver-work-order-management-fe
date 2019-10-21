import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountProfile from "../screens/Account/AccountProfile";
import AccountSetting from "../screens/Account/AccountSetting";

//THIS IS THE ACCOUNT TAB NAVIGATOR IT CREATES THE TABS AT THE BOTTOM OF THE SCREEN IN THE ACCOUNT SECTION SD 10/21/2019
const AccountTabNav = createBottomTabNavigator(
  {
    AccountProfile: {
      //SCREEN / COMPONENT TO BE RENDERED SD 10/21/2019
      screen: AccountProfile,
      navigationOptions: {
        //LABEL AT THE TOP OF THE PAGE SD 10/21/2019
        tabBarLabel: "Profile"
      }
    },
    AccountSetting: {
      screen: AccountSetting,
      navigationOptions: {
        tabBarLabel: "Setting"
      }
    }
  },
  {
    backBehavior: "none",
  }
);
export default AccountTabNav;