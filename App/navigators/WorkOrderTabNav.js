import { createBottomTabNavigator } from 'react-navigation-tabs';
import BarCodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";

const WorkOrderTabNav = createBottomTabNavigator(
  {
    
    WorkOrderLocal: {
      screen: WorkOrderLocal,
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