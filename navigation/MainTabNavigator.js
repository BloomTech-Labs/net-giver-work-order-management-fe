import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import TabBarIcon from "../components/TabBarIcon";
import WorkOrderListView from "../screens/WorkOrder/WorkOrderListView";
import AccountSettings from "../screens/Account/AccountSetting";
import BarcodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner";
import CheckBarCode from "../screens/WorkOrder/BarCodeScanner/CheckBarCode";
import NewWorkOrderForm from "../screens/WorkOrder/NewWorkOrder/NewWorkOrderForm";
import EditWorkOrder from "../screens/WorkOrder/ExistingWorkOrder/EditWorkOrder";
import CameraModule from "../components/camera/Camera";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const WorkOrderStack = createStackNavigator(
  {
    WorkOrderList: {
      screen: WorkOrderListView,
      navigationOptions: props => ({
        title: "Work Order List View",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              // onPress={() => props.navigation.navigate('Logout')}
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    EditWorkOrder: {
      screen: EditWorkOrder,
      navigationOptions: props => ({
        title: "Edit Work Order",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    CameraModule: {
      screen: CameraModule,
      navigationOptions: props => ({
        title: "Take a Photo",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    }
  },
  config
);
// console.log("TCL: WorkOrderStack", WorkOrderStack)

WorkOrderStack.navigationOptions = {
  header: "List View",
  tabBarLabel: "List View",

  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
};

WorkOrderStack.path = "";

const QRStack = createStackNavigator(
  {
    BarCodeScanner: {
      screen: BarcodeScanner,
      navigationOptions: props => ({
        title: "QR Scanner",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    CheckBarCode: {
      screen: CheckBarCode,
      navigationOptions: props => ({
        title: "Verify QR Code",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    NewWorkOrder: {
      screen: NewWorkOrderForm,
      navigationOptions: props => ({
        title: "Create Work Order",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    // ADDS CAMERA SCREEN TO NAVIGATION STACK 10/24/2019 SD
    // NEED TO TRY TO FIND A WAY TO HIDE THE BOTTOM TAB NAV WHEN THE CAMERA IS OPEN
    CameraModule: {
      screen: CameraModule,
      navigationOptions: props => ({
        title: "Take a Photo",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    }
  },
  config
);

QRStack.navigationOptions = {
  tabBarLabel: "QR Scanner",
  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add" : "md-add"}
    />
};

QRStack.path = "";

const AccountStack = createStackNavigator(
  {
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: props => ({
        title: "Account Settings",
        headerRight: (
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("userToken").then(() => {
                  props.navigation.navigate("Auth");
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      })
    }
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: "User Profile",
  tabBarIcon: ({ focused }) =>
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
};

AccountStack.path = "";

const tabNavigator = createBottomTabNavigator({
  WorkOrderStack,
  QRStack,
  AccountStack
});

tabNavigator.path = "";

export default tabNavigator;
