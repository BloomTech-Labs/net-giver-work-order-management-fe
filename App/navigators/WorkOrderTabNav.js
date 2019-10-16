import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScanForWorkOrder from "../screens/WorkOrder/ScanForWorkOrder";
import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";
import WorkOrderForm from "../screens/WorkOrder/WorkOrderForm"

const WorkOrderTabNav = createBottomTabNavigator(
  {
    // ScanForWorkOrder: {
    //   screen: ScanForWorkOrder,
    //   navigationOptions: {
    //     tabBarLabel: "Scanner"
    //   },
    // },
    WorkOrderLocal: {
      screen: WorkOrderLocal,
      navigationOptions: {
        tabBarLabel: "Local"
      },
    },
    // added here for testing
    WorkOrderForm: {
      screen: WorkOrderForm,
      navigationOptions: {
        tabBarLabel: "Form"
      }
    }
  },
  {
    backBehavior: 'none',
  }
);
export default WorkOrderTabNav;