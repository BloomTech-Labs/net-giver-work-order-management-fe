import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { dummyWorkOrder } from '../../Data'
import { wOList } from '../../components/Styles'

const WorkOrderListView = props => {
    // console.log('dummy wo', dummyWorkOrder)
    return (
        <SafeAreaView>
            {dummyWorkOrder.map(res => (
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate('CHANGETOWORKORDERROUTE')
                    }
                >
                    <View style={wOList.card}>
                        <View key={res.id} style={wOList.cardLeft}>
                            <Image
                                key={res.id}
                                style={wOList.image}
                                source={{ uri: res.photoUrl }}
                            />
                        </View>
                        <View style={wOList.cardMiddle}>
                            <Text style={wOList.title} key={res.title}>
                                {res.title.slice(0, 15).concat('...')}
                            </Text>
                            <Text>Requested by {res.username}</Text>
                            <Text>{res.status}</Text>
                        </View>
                        <View style={wOList.cardRight}>
                            <Text>Priority:</Text>
                            <Text key={res.priority}>{res.priority}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            ))}
        </SafeAreaView>
    )
}


export default WorkOrderListView
