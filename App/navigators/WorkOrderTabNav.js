import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScanForWorkOrder from "../screens/WorkOrder/ScanForWorkOrder";
import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";

const WorkOrderTabNav = createBottomTabNavigator(
  {
    ScanForWorkOrder: {
      screen: ScanForWorkOrder,
      navigationOptions: {
        tabBarLabel: "Scanner"
      },
    },
    WorkOrderLocal: {
      screen: WorkOrderLocal,
      navigationOptions: {
        tabBarLabel: "Local"
      },
    }
  },
  {
    backBehavior: 'none',
  }
);
export default WorkOrderTabNav;