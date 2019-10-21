import { createBottomTabNavigator } from 'react-navigation-tabs';
import BarCodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
// import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';

const WorkOrderTabNav = createBottomTabNavigator(
  {
    
    WorkOrderDetail: {
      screen: WorkOrderDetail,
      navigationOptions: {
        tabBarLabel: "Local"
    },
  },
      BarCodeScanner: {
        screen: BarCodeScanner,
        navigationOptions: {
          tabBarLabel: "QR Scanner"
        },
      },
  },
  {
    backBehavior: 'none',
  }
);
export default WorkOrderTabNav;