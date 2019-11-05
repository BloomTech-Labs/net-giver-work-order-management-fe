import React, { useState, useEffect, useContext } from 'react'
import {
    ScrollView,
    View,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
// import {
    
//     ActionSheet,
//     Content,
//     Text,
// } from 'native-base'
// import { token } from '../../../token'
import axios from 'axios'
import {StackActions, NavigationActions} from 'react-navigation'
import { UserContext } from "../../../context/userState";
// import {token} from '../../../token'
const WorkOrderDetails = props => {
    const { user } = useContext(UserContext)
    const token = user.token
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'WorkOrderList' })],
      })
      const resetAction1 = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'WorkOrderDetails' })],
      })
 
    const {qrcode} = props.navigation.state.params.workOrder.isWorkOrder.workorder
console.log("TCL: props", props)
    // SET PLACEHOLDER IMAGES TO STATE 10/24/2019 SD
    const [img1, setImg1] = useState(
        'http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image'
    )
    const [img2, setImg2] = useState(
        'http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image'
    )
    const [img3, setImg3] = useState(
        'http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image'
    )
    //SET CLICKED TO STATE FOR ACTIONsHEET (CAMERA FUNCTIONS) 10/24/2019 SD
    const [clicked, setClicked] = useState()
    // SET PRIORITY 10/24/2019 SD
    const [priority, setPriority] = useState(props.navigation.state.params.workOrder.isWorkOrder.workorder.priority)
    // SET STATUS 10/24/2019 SD
    const [status, setStatus] = useState(props.navigation.state.params.workOrder.isWorkOrder.workorder.status)
    //SET TITLE 10/24/2019 SD
    const [title, setTitle] = useState(props.navigation.state.params.workOrder.isWorkOrder.workorder.title)
    //SET DETAIL 10/24/2019 SD`
    const [detail, setDetail] = useState(props.navigation.state.params.workOrder.isWorkOrder.workorder.detail)
    //SET BUTTONS AND CANCEL_INDEX FOR ACTIONSHEET 12/24/2019 SD
    const BUTTONS = [
        { text: 'Take Picture with Camera' },
        { text: 'Use Existing Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2
    //SET QR CODE FROM PROPS 10/24/2019 SD
    
    console.log("TCL: qrcode", qrcode)
    //SUBMIT HANDLER 10/24/2019 SD
    const handleSubmit = () => {
        const editMutation = `mutation {
            WorkOrderDetails( qrcode: "${qrcode}", detail: "${detail}", priority: "${priority}", status: "${status}", title: "${title}"){
              qrcode
              detail
              priority
              status
              title
            }
          }`

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            headers: {
                'x-token': token,
            },
            data: {
                query: editMutation,
            },
        }).then(res => {
            console.log('response submit', res)
            props.navigation.navigate('WorkOrderList', {sentFrom:'WorkOrderDetails', token:token})
            props.navigation.dispatch(resetAction);
            // props.navigation.dispatch(resetAction1);
        })
    }

    return (
        <ScrollView>
           
        </ScrollView>
    )
}

export default Details
