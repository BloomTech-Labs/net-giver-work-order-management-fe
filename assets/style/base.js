import { StyleSheet, Dimensions } from "react-native"

export const dimensions = {
    fullHeight: Dimensions.get("window").height,
    fullWidth: Dimensions.get("window").width,
}

export const color = {
    white: "#ffffff",
    black: "#000000",
    priGreen: "#00830B",
    greyText: "#89898E",
    priLow: "#00830B",
    priMed: "#087FFF",
    priHigh: "#E1AA08",
    priUrg: "#FE273A",
    accLow: "#D9F9C7",
    accMed: "#E2F5FC",
    accHigh: "#FBF2D7",
    accUrg: "#FFD3D3",
}

export const font = {
    reg: "IBMPlexSans-Regular",
    med: "IBMPlexSans-Medium",
    bold: "IBMPlexSans-Bold",
    sm: 14,
    md: 17,
    lg: 20,
    xl: 24,
}

export const marpad = {
    xs: 10,
    sm: 15,
    md: 20,
    lg: 25,
    xl: 30,
}
