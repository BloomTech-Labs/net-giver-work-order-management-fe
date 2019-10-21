import { createStackNavigator } from "react-navigation-stack";
import WorkOrderTabNav from './WorkOrderTabNav';
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';
import CheckBarCode from '../screens/WorkOrder/BarCodeScanner/CheckBarCode';
import NewWorkOrderPhoto from '../screens/WorkOrder/NewWorkOrder/NewWorkOrderPhoto';
import EditViewHolder from '../screens/WorkOrder/ExistingWorkOrder/EditViewHolder';
import Camera from '../components/Camera'
import GetImage from '../components/GetImage'
import WorkOrderForm from "../screens/WorkOrder/NewWorkOrder/WorkOrderForm"

const WorkOrderStackNav = createStackNavigator(
  {
    WorkOrderTabNav: { 
      screen: WorkOrderTabNav 
    },
    CheckBarCode: {
      screen:CheckBarCode,
    },
    NewWorkOrderPhoto: {
      screen: NewWorkOrderPhoto,
    },
    EditViewHolder: {
      screen: EditViewHolder,
    },
    Camera: {
      screen: Camera,
    },
    GetImage:{
      screen: GetImage,
    },
    WorkOrderForm:{
      screen: WorkOrderForm
    },
    
   WorkOrderDetail: { screen: WorkOrderDetail },
  },
  {
    headerMode: 'none',
  }
);

export default WorkOrderStackNav;