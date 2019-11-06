//SD 10/16/19

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
    StyleSheet,
    View,
    Button,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
// import { token } from "../../../token";
import { styles } from '../../../components/Styles'
import { UserContext } from '../../../context/userState'

const CheckBarCode = props => {
    // const [token, setToken] = useState();

const { user } = useContext(UserContext)
// user = state
  const isWorkOrder = {qrCode:"12345", detail:"The Toilet is Leaking", title:"Fix Toilet", priority:"High", status:"Not Yet Started", user:"John Smith"};
  const qrCode = props.navigation.state.params.qrData;
  
  // BARCODE FOR TESTING HERE
  // const qrCode = "n1706";
  
  const token = user.token
  console.log("CHECKING BARCODE");

const getMutation = `query {
  workorder( qrcode: "${qrCode}"){
    id
    qrcode
    detail
    createdAt
    priority
    status
    title
}
}`
    const createMutation = `mutation {
  createWorkorder( qrcode: "${qrCode}"){
    id
    qrcode
    detail
    createdAt
    priority
    status
    title
  }
}`

    useEffect(() => {
    //CHECK TO SEE IF QR AND SEND BACK 10/16/2019 SD
    if (!qrCode) {
        console.log('WHY');
        props.navigation.navigate('BarCodeScanner')
    } else {
        //RUN THE MUTATION
        //TODO NEEDS TO BE MOVED OUT OF THIS FILE SD 10/16/19

        //   TOKEN IS NOT CONSTANT!!!!!!!!!!!!!!!!!!!!!!!!!!
        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            headers: {
                'x-token': token,
            },

            data: {
                query: getMutation,
            },
        }).then(res => {
            
            const isWorkOrder = res.data.data.workorder
            console.log(isWorkOrder, "THIS IS THE WORK RODER")
            if (isWorkOrder && isWorkOrder.qrcode) {
                
                //IF THERE IS A QR CODE OF THAT VALUE SEND TO EDIT PAGE
                //WITH WORKORDER PROPS PASSED TO IT
                console.log("wrong way")
                props.navigation.navigate('EditWorkOrder', {
                    workOrder: isWorkOrder,
                    token: token,
                })
                
            } else {
                console.log("right way")
                // IF THERE IS NOT AN EXISTING QR CODE SEND TO THE NEWWORKORDER SCREEN AND SEND THE QR CODE TO THE SCREEN AS PROPS 10/24/2019 SD
                axios({
                    method: 'post',
                    url: 'https://netgiver-stage.herokuapp.com/graphql',
                    headers: {
                        'x-token': token,
                    },
                    data: {
                        query: createMutation,
                    },
                }).then(res => {
                    console.log('created')
                    props.navigation.navigate('NewWorkOrder', {
                        qrCode: qrCode,
                        token: token,
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}, [])
    //DISPLAYS A SPINNER IN CASE OF LOAD TIME 10/16/19 SD

    //TODO: NEEDS TO BE STYLED SD 10/16/19
    return (
        <>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="black" />
            </View>
        </>
    )
}

export default CheckBarCode
