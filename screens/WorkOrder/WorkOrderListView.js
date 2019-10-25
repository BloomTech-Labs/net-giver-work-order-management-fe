import React, { useEffect, useState } from 'react'
import {
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import axios from 'axios'
import { dummyWorkOrder } from '../../Data'
import { wOList } from '../../components/Styles'
// import { token } from "../../token";


const WorkOrderListView = props => {
    const [userMap, setUserMap] = useState();
    const [workOrderMap, setWorkOrderMap] = useState();
    const [token, setToken] = useState();
   (AsyncStorage.getItem('TOKEN', (err, result) => {
    setToken(result);
      }))
console.log("TCL: props", props)
console.log("sync", token)
    // GQL QUERY TO RETURN USER OBJECTS WITH WORKORDERS 10/24/2019 SD
    const queryDb = `query {users{id username displayName picture photo{path} phone email workorders{id qrcode title detail status priority createdAt}}}`
    useEffect(() => {

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            headers: {
                'x-token': token,
            },
            data: {
                query: `query {
                    user(id: 3){
                  username}
                  }
                  `,
            },
        }).then(res => {
            console.log('response recd from wol', res)
            // setUserMap(res.data.data.users)
            // console.log("TCL: userMap", userMap)
            
            // props.navigation.navigate('WorkOrderListView')
        })}, )
   
    let r = Math.random()
    return (
        <ScrollView>
            {/* MAP WORK ORDER DATA AND PULL OUT THE VALUES 10/24/2019 SD */}
            {dummyWorkOrder.map(res => (
                // MAKE THE WHOLE BOX A BUTTON THAT CAN BE CLICKED TO OPEN THE w/o 10/24/2019 SD
                <TouchableOpacity
                    onPress={() =>
                        console.log(token)
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
                            <Text style={wOList.title}>
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
