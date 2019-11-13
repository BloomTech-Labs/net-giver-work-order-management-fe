import React, { useEffect, useState } from "react"
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"
import { color, font, marpad } from "../../assets/style/base"
import { styles } from "../../assets/style"

const Details = props => {
    return (
        <SafeAreaView style={styles.containerNoJustify}>
            <Text style={text.header}>Details Page</Text>
        </SafeAreaView>
    )
}
export default Details
