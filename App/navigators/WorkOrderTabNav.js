import { createBottomTabNavigator } from 'react-navigation-tabs';
import WorkOrderGlobal from "../screens/WorkOrderGlobal";
import WorkOrderLocal from "../screens/WorkOrderLocal";

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