import React from "react"
import { SafeAreaView, Text } from "react-native"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"
import { color, font, marpad, cnt, mar } from "../../assets/style/base"
import { styles } from "../../assets/style"

const Contact = () => {
    return (
        <SafeAreaView style={cnt.cntNJ}>
            <Text style={text.header}>Contact Us</Text>
            <Text style={text.smTxt}>The Net Giver Foundation</Text>
            <Text style={text.smTxt}>1801 Sw New Orleans Avenue</Text>
            <Text style={text.smTxt}>Lees Summit MO, USA</Text>
            <Text style={text.smTxtSmBot}>(816) 200-0876</Text>
        </SafeAreaView>
    )
}

export default Contact
