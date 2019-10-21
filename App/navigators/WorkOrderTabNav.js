import { createBottomTabNavigator } from "react-navigation-tabs";
import BarCodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
// import WorkOrderLocal from "../screens/WorkOrder/WorkOrderLocal";
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';

//THIS IS THE WORK ORDER TAB NAVIGATOR IT CREATES THE TABS AT THE BOTTOM OF THE SCREEN IN THE WORKORDER SECTION SD 10/21/2019
// TAB NAVIGATION WILL EVENTUALLY BE REMOVED FROM THE APPLICATION SD 10/21/2019
const WorkOrderTabNav = createBottomTabNavigator(
  {


    WorkOrderLocal: {
      //SCREEN TO BE RENDERED SD 10/21/2019
      screen: WorkOrderLocal,
      //LABEL AT THE TOP OF THE PAGE SD 10/21/2019

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
