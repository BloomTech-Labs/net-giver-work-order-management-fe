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
import { color, font, marpad, cnt, mar } from "../../assets/style/base"
import { styles } from "../../assets/style"

const MyWorkOrders = props => {
    return (
        <SafeAreaView style={styles.containerNoJustify}>
            <Text style={text.header}>MyWorkOrders</Text>
        </SafeAreaView>
    )
}

export default MyWorkOrders