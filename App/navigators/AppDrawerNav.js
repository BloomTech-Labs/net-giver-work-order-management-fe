import { createDrawerNavigator } from "react-navigation-drawer";
import AccountTabNav from './AccountTabNav';
import WorkOrderStackNav from './WorkOrderStackNav';

const AppDrawerNav = createDrawerNavigator({
  WorkOrder: {
    screen: WorkOrderStackNav,
    navigationOptions: {
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