import { StyleSheet } from "react-native"
import { color, font, mp, dimensions } from "../../base"

const baseFont = {
    fontFamily: font.reg,
}
const baseFontMed = {
    fontFamily: font.med,
}
const baseFontBold = {
    fontFamily: font.bold,
}
export const text = StyleSheet.create({
    header: {
        ...baseFontBold,
        fontSize: font.xl,
    },
    headerSmTop: {
        ...baseFontBold,
        fontSize: font.xl,
        marginTop: mp.sm,
    },
    subheader: {
        ...baseFont,
        fontSize: font.md,
    },
    subheaderSmBot: {
        ...baseFont,
        fontSize: font.md,
        marginBottom: mp.sm,
    },
    smTxt: {
        ...baseFont,
        fontSize: font.sm,
    },
    smTxtSmBot: {
        ...baseFont,
        fontSize: font.sm,
        marginBottom: mp.sm,
    },
    smTxtSmBotML: {
        ...baseFont,
        fontSize: font.sm,
        marginBottom: mp.sm,

    },

})
