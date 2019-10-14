import { createStackNavigator } from "react-navigation-stack";
import WorkOrderTabNav from './WorkOrderTabNav';
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';
import WorkOrderCheck from '../screens/WorkOrder/WorkOrderCheck';
import WorkOrderNew from '../screens/WorkOrder/WorkOrderNew';


const WorkOrderStackNav = createStackNavigator(
  {
    WorkOrderTabNav: { 
      screen: WorkOrderTabNav 
    },
    WorkOrderCheck:{
      screen:WorkOrderCheck,
    },
    WorkOrderNew: {
      screen: WorkOrderNew,
    },

    WorkOrderDetail: { screen: WorkOrderDetail },
  },
  {
    headerMode: 'none',
  }
);

export default WorkOrderStackNav;