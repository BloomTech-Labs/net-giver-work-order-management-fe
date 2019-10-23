import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'

const WorkOrderListView = (props) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Work Order List View</Text>
            </View>
            <View >
            <TouchableOpacity onPress={() => props.navigation.navigate('BarCodeScanner')}>
            <Text>Create A New Work Order +</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default WorkOrderListView
