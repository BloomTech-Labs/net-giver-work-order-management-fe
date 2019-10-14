import { createStackNavigator } from "react-navigation-stack";
import WorkOrderTabNav from './WorkOrderTabNav';
import WorkOrderDetail from '../screens/WorkOrder/WorkOrderDetail';

const WorkOrderStackNav = createStackNavigator(
  {
    WorkOrderTabNav: { screen: WorkOrderTabNav },
    WorkOrderDetail: { screen: WorkOrderDetail },
  },
  {
    headerMode: 'none',
  }
);

export default WorkOrderStackNav;