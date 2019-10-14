import { createBottomTabNavigator } from 'react-navigation-tabs';
import WorkOrderGlobal from "../screens/WorkOrder/WorkOrderGlobal";
import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";

const WorkOrderTabNav = createBottomTabNavigator(
  {
    WorkOrderGlobal: {
      screen: WorkOrderGlobal,
      navigationOptions: {
        tabBarLabel: "Global"
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