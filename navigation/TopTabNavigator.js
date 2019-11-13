import React from "react";
import { Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Comments from "../screens/WorkOrder/ExistingWorkOrder/WorkOrderComments/Comments";
import Details from "../screens/WorkOrder/Details";
import { color, font } from "../assets/style/base";

// STYLE CONFIGURATION FOR TOP TAB NAVIGATOR 11/13/2019 SD
// https://reactnavigation.org/docs/en/material-top-tab-navigator.html#tabnavigatorconfig
const config = {
  initialRouteName: "Details",
  tabBarOptions: {
    style: {
      backgroundColor: "white"
    },
    labelStyle: {
      color: color.priGreen,
      fontFamily: font.med,
      fontSize: font.md
    },

    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: color.priGreen,
      height: 3
    }
  }
};
// CREATE A TOP TAB NAVIGATOR THAT RENDERS THE DETAILS PAGE OR THE COMMENTS PAGE
// IMPORT THIS IN THE MAIN TAB NAVIGATOR INSTEAD OF THE DETAILS PAGE 11/13/2019 SD
const TopTab = createMaterialTopTabNavigator(
  {
    Details: {
      screen: Details,
      navigationOptions: props => ({
        title: "Details"
      })
    },
    Comments: {
      screen: Comments,
      navigationOptions: props => ({
        title: "Comments"
      })
    }
  },
  // BE SURE TO PUT IN THE STYLING CONFIGURATION 11/13/2019 SD
  config
);

export default TopTab;
