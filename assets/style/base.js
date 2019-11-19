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
    inputBorder: "#C5C2C2",
    input: "#EDF1F3",
    priLow: "#087FFF",
    priMed: "#00830B",
    priHigh: "#E1AA08",
    priUrg: "#FE273A",
    accLow: "#E2F5FC",
    accMed: "#D9F9C7",
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

export const mp = {
    xs: 10,
    sm: 15,
    md: 20,
    lg: 25,
    xl: 30,
}

export const cnt = StyleSheet.create({
    cnt: {
        flex: 1,
        alignItems: "center",
        backgroundColor: color.white,
        justifyContent: "center",
    },
    cntNJ: {
        flex: 1,
        alignItems: "center",
        backgroundColor: color.white,
    },
})

export const mar = StyleSheet.create({
    smMarLR: {
        marginRight: mp.sm,
        marginLeft: mp.sm,
    },
    marMdLtMdTp: {
        marginLeft: mp.md,
        marginTop: mp.md,
    },
    marLgLSmR: {
        marginLeft: mp.lg,
        marginRight: mp.sm,
    },
    marMdLtRtBt: {
        marginLeft: mp.md,
        marginRight: mp.md,
        marginBottom: mp.md,
    },
})
