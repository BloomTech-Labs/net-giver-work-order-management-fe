import { StyleSheet } from "react-native"
import { color, font, marpad, dimensions } from "../../base"

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
    headerSmTop:{
        ...baseFontBold,
        fontSize: font.xl,
        marginTop:marpad.sm,
    },
    subheader:{
        ...baseFont,
        fontSize: font.md
    },
})
