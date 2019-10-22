import { createBottomTabNavigator } from "react-navigation-tabs";
import BarCodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
<<<<<<< HEAD
// import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';
=======
import WorkOrderList from "../screens/WorkOrder/WorkOrderList";
>>>>>>> work-order-list-display

//THIS IS THE WORK ORDER TAB NAVIGATOR IT CREATES THE TABS AT THE BOTTOM OF THE SCREEN IN THE WORKORDER SECTION SD 10/21/2019
// TAB NAVIGATION WILL EVENTUALLY BE REMOVED FROM THE APPLICATION SD 10/21/2019
const WorkOrderTabNav = createBottomTabNavigator(
  {
<<<<<<< HEAD


    WorkOrderLocal: {
      //SCREEN TO BE RENDERED SD 10/21/2019
      screen: WorkOrderLocal,
      //LABEL AT THE TOP OF THE PAGE SD 10/21/2019

=======
    WorkOrderList: {
      screen: WorkOrderList,
>>>>>>> work-order-list-display
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
