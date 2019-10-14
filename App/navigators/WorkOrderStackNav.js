import { createStackNavigator } from "react-navigation-stack";
import WorkOrderTabNav from './WorkOrderTabNav';
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';
import WorkOrderCheck from '../screens/WorkOrder/WorkOrderCheck';


const WorkOrderStackNav = createStackNavigator(
  {
    WorkOrderTabNav: { 
      screen: WorkOrderTabNav 
    },
    WorkOrderCheck:{
      screen:WorkOrderCheck,
    },

    WorkOrderDetail: { screen: WorkOrderDetail },
  },
  {
    headerMode: 'none',
  }
);

export default WorkOrderStackNav;