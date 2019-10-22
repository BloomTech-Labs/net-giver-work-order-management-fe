import { createBottomTabNavigator } from "react-navigation-tabs";
import BarCodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
import WorkOrderList from "../screens/WorkOrder/WorkOrderList";

const WorkOrderTabNav = createBottomTabNavigator(
  {
    WorkOrderList: {
      screen: WorkOrderList,
      navigationOptions: {
        tabBarLabel: "Local"
      }
    },
    BarCodeScanner: {
      screen: BarCodeScanner,
      navigationOptions: {
        tabBarLabel: "QR Scanner"
      }
    }
  },
  {
    backBehavior: "none"
  }
);
export default WorkOrderTabNav;
