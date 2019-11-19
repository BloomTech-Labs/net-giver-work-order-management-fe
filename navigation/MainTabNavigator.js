import React from "react"
import {
    Platform,
    Text,
    View,
    Button,
    TouchableOpacity,
    AsyncStorage,
} from "react-native"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"
import TabBarIcon from "../components/TabBarIcon"
import WorkOrderListView from "../screens/WorkOrder/WorkOrderListView"
import AccountSettings from "../screens/Account/AccountSetting"
import BarcodeScanner from "../screens/WorkOrder/BarCodeScanner/BarCodeScanner"
import CheckBarCode from "../screens/WorkOrder/BarCodeScanner/CheckBarCode"
import BarCodeChecker from "../screens/WorkOrder/BarCodeScanner/BarCodeChecker"
import EditWorkOrder from "../screens/WorkOrder/ExistingWorkOrder/EditWorkOrder"
import CameraModule from "../components/camera/Camera"
import GalleryScreen from "../components/camera/GalleryScreen"
import TopTab from "./TopTabNavigator"
import { color, font } from "../assets/style/base"
import TopTabNavListView from "./TopTabNavListView"
import Email from "../screens/SignUp/Phone.P1"

const handleTabPress = ({ navigation, defaultHandler }) => {
    navigation.popToTop()
    defaultHandler()
}

const logOut = ({ navigation }) => {
    AsyncStorage.removeItem("userToken").then(() => {
        navigation.navigate("Auth")
    })
}

const config = Platform.select({
    web: { headerMode: "screen" },
    default: {},
})

const WorkOrderStack = createStackNavigator(
    {
        WorkOrderList: {
            screen: TopTabNavListView,
            navigationOptions: props => ({
                tabBarOnPress: handleTabPress,
                // title: "Work Order List View",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            // onPress={() => props.navigation.navigate('Logout')}
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },
        EditWorkOrder: {
            screen: EditWorkOrder,
            navigationOptions: props => ({
                title: "Edit Work Order",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },

        Details: {
            screen: TopTab,
            navigationOptions: ({ navigation }) => ({
                title: "Details",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },
        CameraModule: {
            screen: CameraModule,
        },
        GalleryScreen: {
            screen: GalleryScreen,
        },
    },
    config
)
WorkOrderStack.navigationOptions = {
    header: "List View",
    tabBarLabel: "Work Orders",

    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
        />
    ),
}

WorkOrderStack.path = ""

const QRStack = createStackNavigator(
    {
        BarCodeScanner: {
            screen: BarcodeScanner,
            navigationOptions: props => ({
                title: "QR Scanner",
                tabBarOnPress: handleTabPress,
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },
        BarCodeChecker: {
            screen: BarCodeChecker,
        },
        CheckBarCode: {
            screen: CheckBarCode,
            navigationOptions: props => ({
                title: "Verify QR Code",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },

        CameraModule: {
            screen: CameraModule,
            navigationOptions: props => ({
                title: "Take a Photo",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },
    },
    config
)

QRStack.navigationOptions = {
    tabBarLabel: "Scan",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
        />
    ),
}

QRStack.path = ""

const AccountStack = createStackNavigator(
    {
        AccountSettings: {
            screen: Email,
            navigationOptions: props => ({
                title: "Account Settings",
                headerRight: (
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("userToken").then(
                                    () => {
                                        props.navigation.navigate("Auth")
                                    }
                                )
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }),
        },
    },
    config
)

AccountStack.navigationOptions = {
    tabBarLabel: "User Profile",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-options" : "md-options"}
        />
    ),
}

AccountStack.path = ""

const configBottomTab = {
    tabBarOptions: {
        style: {
            backgroundColor: "white",
        },
        labelStyle: {
            color: color.priGreen,
            fontFamily: font.reg,
            fontSize: font.sm,
        },
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: color.priGreen,
            height: 3,
        },
        inactiveTintColor: color.greyText,
    },
}

const tabNavigator = createBottomTabNavigator(
    {
        WorkOrderStack,
        QRStack,
        AccountStack,
    },
    configBottomTab
)

tabNavigator.path = ""

export default tabNavigator
