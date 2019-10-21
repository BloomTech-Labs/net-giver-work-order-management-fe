import { createDrawerNavigator } from "react-navigation-drawer";
import AccountTabNav from './AccountTabNav';
import WorkOrderStackNav from './WorkOrderStackNav';

//THIS IS THE DRAWER NAV OR THE "HAMBURGER MENU" SD 10/21/2019
const AppDrawerNav = createDrawerNavigator({
  WorkOrder: {
      //SCREEN / COMPONENT TO BE RENDERED SD 10/21/2019
      screen: WorkOrderStackNav,
    navigationOptions: {
      //WHAT IS DISPLAYED IN THE DRAWER SD 10/21/2019
      title: 'Work Order',
    },
  },
  Account: {
    screen: AccountTabNav,
    navigationOptions: {
      title: 'Account',
    },
  },
});

export default AppDrawerNav;