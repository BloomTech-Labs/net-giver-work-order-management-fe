import React from 'react'
import {
    SafeAreaView,
    ScrollView,
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
    let r = Math.random();
    return (

        <ScrollView>
            {/* MAP WORK ORDER DATA AND PULL OUT THE VALUES 10/24/2019 SD */}
            {dummyWorkOrder.map(res => (
                // MAKE THE WHOLE BOX A BUTTON THAT CAN BE CLICKED TO OPEN THE w/o 10/24/2019 SD
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate('CHANGETOWORKORDERROUTE')
                    }
                >
                    {/* BUILD THE WORKORDER CARD 10/24/2019 SD */}
                    {/* 3 FLEX COLUMNS */}
                    <View style={wOList.card}>
                        {/* FLEX COLUMN 1 LEFT HOLDS THE IMAGE FLEX SET TO 2 10/24/2019 SD */}
                        <View style={wOList.cardLeft}>
                            <Image
                                
                                style={wOList.image}
                                source={{ uri: res.photoUrl }}
                            />
                        </View>
                        {/* FLEX COLUMN 2 MIDDLE HOLDS THE WORK ORDER INFORMATION FLEX SET TO 4 10/24/2019 SD */}
                        <View style={wOList.cardMiddle}>
                            <Text style={wOList.title} >
                                {res.title.slice(0, 15).concat('...')}
                            </Text>
                            <Text>Requested by {res.username}</Text>
                            <Text>{res.status}</Text>
                        </View>
                        {/* FLEX COLUMN 3 RIGHT HOLDS THE PRIORITY/STATUS BADGES FLEX SET TO 2 10/24/2019 SD */}
                        <View style={wOList.cardRight}>
                            <Text>Priority:</Text>
                            <Text>{res.priority}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            ))}
        </ScrollView>
    )
}
export default WorkOrderListView
