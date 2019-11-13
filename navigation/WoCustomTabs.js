import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  createNavigator,
  NavigationState,
  SafeAreaView,
  TabRouter,
  Themed,
  ThemeContext,
  useTheme,
  createAppContainer,
  NavigationScreenProp
} from "react-navigation";
import {
  ScrollView,
  View,
  Alert,
  Image,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  Text,
  LayoutAnimation
} from "react-native";
import { Button } from "../components/shared/ButtonWithMargin";
import SampleText from "../components/shared/SampleText";
import EditWorkOrder from "../screens/WorkOrder/ExistingWorkOrder/EditWorkOrder";
import Comments from "../screens/WorkOrder/ExistingWorkOrder/Comments";
import Details from "../screens/WorkOrder/Details";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

const EditWorkOrderScreens = ({ navigation }) =>
  <EditWorkOrder banner="Home Screen" navigation={navigation} />;

const DetailsScreen = ({ navigation }) =>
  <Details banner="Settings Screen" navigation={navigation} />;

const CommentsScreen = ({ navigation }) =>
  <Comments banner="Settings Screen" navigation={navigation} />;

class MaterialTopTabBarWrapper extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#FFFFFF", border: "0.5px solid #F8F5F4" }}
        forceInset={{ horizontal: "never", bottom: "never" }}
      >
        <MaterialTopTabBar
          style={{
            padding: 0
          }}
          {...this.props}
        />
      </SafeAreaView>
    );
  }
}
const SimpleTabs = createMaterialTopTabNavigator(
  {
    Details: DetailsScreen,
    Comments: CommentsScreen
  },
  {
    tabBarComponent: MaterialTopTabBarWrapper,
    initialRouteName: "Details",
    tabBarOptions: {
      style: {
        backgroundColor: "#FFFFFF"
      },
      labelStyle: {
        fontFamily: "IBMPlexSans-Regular",
        color: "#89898E"
      },
      activeTintColor: { color: "#00830B" },
      indicatorStyle: {
        backgroundColor: "#00830B",
        height: 3
      }
    },
    style: {
      paddingTop: 0
    }
  }
);

export class CustomTabs extends React.Component {
  static contextType = ThemeContext;

  static router = SimpleTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const activeRoute = routes[index];
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <SimpleTabs
          navigation={navigation}
          style={{
            padding: 0
          }}
        />
      </View>
    );
  }
}
