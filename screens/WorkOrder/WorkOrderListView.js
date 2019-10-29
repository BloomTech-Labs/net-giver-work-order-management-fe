import React, { useEffect, useState, useContext } from 'react'
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
    ActivityIndicator
} from 'react-native'
import axios from 'axios'
import { dummyWorkOrder } from '../../Data'
import { wOList } from '../../components/Styles'
// import { token } from "../../token";
import {StackActions, NavigationActions} from 'react-navigation'
import { UserContext } from "../../context/userState";

const WorkOrderListView = props => {
    const [userMap, setUserMap] = useState();
    const [workOrderMap, setWorkOrderMap] = useState(null);
    const [sentFrom, setSentFrom] = useState()
    // const { user } = useContext(UserContext)
    const { user } = useContext(UserContext)
// user = state
console.log(user)

    // const [token, setToken] = useState(props.navigation.state.params.token);
//    (AsyncStorage.getItem('TOKEN', (err, result) => {
//     setToken();
//       }))
console.log("TCL: props", props)
// console.log("sync", token)
    // GQL QUERY TO RETURN USER OBJECTS WITH WORKORDERS 10/24/2019 SD
    const queryDb = `query {users{id username displayName picture photo{path} phone email workorders{id qrcode title detail status priority createdAt}}}`

    useEffect(() => {
       setSentFrom(props.navigation.getParam('sentFrom', 'nowhere'))
    //    setToken(props.navigation.state.params.token)

   }, )
   
    useEffect(() => {

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            headers: {
                'x-token': user.token,
            },
            data: {
                query: `query {
                    workorders {
                      edges {
                        id
                        detail
                        createdAt
                        qrcode
                        priority
                        status
                        title
                        userId
                      }
                      pageInfo {
                        hasNextPage
                        endCursor
                      }
                    }
                  }
                  `,
            },
            
        }).then(res => {
            // console.log('response recd from wol', res. data)
            // setUserMap(res.data.data.users)
            // console.log("TCL: userMap", userMap)
            setWorkOrderMap(res.data.data.workorders.edges)
            console.log("workOrderMap", workOrderMap)
            // props.navigation.navigate('WorkOrderListView')
        })}, [sentFrom])
        console.log("workOrderMap1", workOrderMap)
        
    //    const map = workOrderMap || workOrderMap.map(res => console.log(res))
    // const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: 'WorkOrderList' })],
    //   })
    let r = Math.random()
    return (
        <ScrollView>
            {/* MAP WORK ORDER DATA AND PULL OUT THE VALUES 10/24/2019 SD */}
            {!workOrderMap ?<ActivityIndicator size="large" color="black" />: workOrderMap.map(res => (
            
            // MAKE THE WHOLE BOX A BUTTON THAT CAN BE CLICKED TO OPEN THE w/o 10/24/2019 SD
                <TouchableOpacity
                key={res.id} 
                onPress={() =>
                        props.navigation.navigate('CheckBarCode', {qrData: res.qrcode, token: user.token})
                    }
                >
                    {/* BUILD THE WORKORDER CARD 10/24/2019 SD */}
                    {/* 3 FLEX COLUMNS */}
                    <View style={wOList.card}>
                        {/* FLEX COLUMN 1 LEFT HOLDS THE IMAGE FLEX SET TO 2 10/24/2019 SD */}
                        <View style={wOList.cardLeft}>
                            <Image
                                style={wOList.image}
                                source={{ uri: 'http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image' }}
                            />
                        </View>
                        {/* FLEX COLUMN 2 MIDDLE HOLDS THE WORK ORDER INFORMATION FLEX SET TO 4 10/24/2019 SD */}
                        <View style={wOList.cardMiddle}>
                            <Text style={wOList.title}>
                                {res.title}
                            </Text>
                            <Text>Requested by:</Text>
                            <Text>{res.id}</Text>
                        </View>
                        {/* FLEX COLUMN 3 RIGHT HOLDS THE PRIORITY/STATUS BADGES FLEX SET TO 2 10/24/2019 SD */}
                        <View style={wOList.cardRight}>
                            <Text>Priority:</Text>
                            <Text>{res.priority}</Text>
                            <Text>Status:</Text>
                            <Text>{res.status}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            )}
        </ScrollView>
    )
}
export default WorkOrderListView
