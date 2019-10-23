import React from "react";
import { Platform, Text, Button, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WorkOrderListView from "../screens/WorkOrder/WorkOrderListView";
import AccountSettings from "../screens/Account/AccountSetting";
import BarcodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
import CheckBarCode from "../screens/WorkOrder/BarCodeScanner/CheckBarCode";
import WorkOrderForm from "../screens/WorkOrder/NewWorkOrder/WorkOrderForm";
import EditWorkOrder from "../screens/WorkOrder/ExistingWorkOrder/EditWorkOrder";
import Test from "../screens/WorkOrder/NewWorkOrder/Test";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const WorkOrderStack = createStackNavigator(
  {
    WorkOrderList: {
      screen: WorkOrderListView,
      navigationOptions: {
        title: "Work Order List View"
      }
    },
    EditWorkOrder: {
      screen: EditWorkOrder,
      navigationOptions: {
        title: "Edit Work Order"
      }
    }
  },
  config
);
// console.log("TCL: WorkOrderStack", WorkOrderStack)

WorkOrderStack.navigationOptions = {
  header: "List View",
  tabBarLabel: "List View",

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

WorkOrderStack.path = "";

const QRStack = createStackNavigator(
  {
    BarCodeScanner: {
      screen: BarcodeScanner,
      navigationOptions: {
        title: "QR Scanner"
      }
    },
    CheckBarCode: {
      screen: CheckBarCode,
      navigationOptions: {
        title: "Verify QR Code"
      }
    },
    NewWorkOrder: {
      screen: WorkOrderForm,
      navigationOptions: {
        title: "Create Work Order"
      }
    }
  },
  config
);

QRStack.navigationOptions = {
  tabBarLabel: "QR Scanner",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add" : "md-add"}
    />
  )
};

QRStack.path = "";

const AccountStack = createStackNavigator(
  {
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: {
        title: "Account Settings"
      }
    }
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: "User Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

AccountStack.path = "";

const tabNavigator = createBottomTabNavigator({
  WorkOrderStack,
  QRStack,
  AccountStack
});

tabNavigator.path = "";

export default tabNavigator;
