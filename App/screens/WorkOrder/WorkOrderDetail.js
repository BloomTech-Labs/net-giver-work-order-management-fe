import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import { textS } from '../../Style'
const WorkOrderDetail = props => {
    const { navigation } = props
    return (
        <View style={styles.container}>
            <Text>Work Order Detail View</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    params: {
        textAlign: 'center',
        margin: 10,
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
})
export default WorkOrderDetail
