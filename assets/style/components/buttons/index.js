import { StyleSheet } from "react-native"
import { color, font, mp, dimensions } from "../../base"

const baseBtnStyle = {
    backgroundColor: color.priGreen,
    borderRadius: 4,
    padding: mp.xs,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: color.greyText,
}

//Touchable Opacity Button 11/12/2019 SD
export const topBtn = StyleSheet.create({
    btn: {
        ...baseBtnStyle,
    },
    fullWidthBtn: {
        ...baseBtnStyle,
        width: "90%",
    },
    fullWidthBtnMargin: {
        ...baseBtnStyle,
        width: "90%",
        marginTop:mp.md,
        marginBottom:mp.md,
    },
    fullWidthBtnMarginBottom: {
        ...baseBtnStyle,
        width: "90%",
        marginBottom:mp.xl,
    },
    halfWidthBtn: {
        ...baseBtnStyle,
        width: "45%",
    },
    halfWidthBtnMargin: {
        ...baseBtnStyle,
        width: "45%",
        marginTop:mp.md,
        marginBottom:mp.md,
    },
    btnFont: {
        fontFamily: font.med,
        fontSize: font.md,
        alignSelf: "center",
        color: color.white,
    },
})
