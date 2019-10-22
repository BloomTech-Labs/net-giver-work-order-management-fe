import { createStackNavigator } from "react-navigation-stack";
import WorkOrderTabNav from "./WorkOrderTabNav";
import WorkOrderDetail from "../screens/WorkOrder/WorkOrderDetail";
import CheckBarCode from "../screens/WorkOrder/BarCodeScanner/CheckBarCode";
import NewWorkOrderPhoto from "../screens/WorkOrder/NewWorkOrder/NewWorkOrderPhoto";
import EditViewHolder from "../screens/WorkOrder/ExistingWorkOrder/EditViewHolder";
import Camera from "../components/Camera";
import GetImage from "../components/GetImage";
import WorkOrderForm from "../screens/WorkOrder/NewWorkOrder/WorkOrderForm";

// THIS IS THE WORK ORDER STACK NAV SD 10/21/2019
// THIS IS WHERE ALL OF THE WORK ORDER COMPONENTS ARE RENDERED SD 10/21/2019
const WorkOrderStackNav = createStackNavigator(
  {
    WorkOrderTabNav: {
      //SCREEN / COMPONENT TO BE RENDERED SD 10/21/2019
      screen: WorkOrderTabNav
    },
    CheckBarCode: {
      screen: CheckBarCode
      // CAN ALSO BE ADDED
      // navigationOptions: {
      //   tabBarLabel: "Scan Bar Code"
      // }
    },
    NewWorkOrderPhoto: {
      screen: NewWorkOrderPhoto
    },
    EditViewHolder: {
      screen: EditViewHolder
    },
    Camera: {
      screen: Camera
    },
    GetImage: {
      screen: GetImage
    },
    WorkOrderForm: {
      screen: WorkOrderForm
    },

    WorkOrderDetail: { screen: WorkOrderDetail }
  },
  {
    headerMode: "none"
  }
);

export default WorkOrderStackNav;
