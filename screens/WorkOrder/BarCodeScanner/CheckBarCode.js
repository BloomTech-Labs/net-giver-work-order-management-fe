//SD 10/16/19

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    SafeAreaView,
    Text,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
// import { token } from "../../../token";
import { styles } from '../../../components/Styles'
import { gql } from 'apollo-boost'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'

const CheckBarCode = props => {
    const CHECK_FOR_WORKORDER = gql`
    query {
        workorder(qrcode: ${props.navigation.state.params.qrData}) {
            id
            qrcode
            detail
            createdAt
            priority
            status
            title
        }
    }
`

    const CREATE_WORK_ORDER = gql`
        mutation createWorkorder($qrcode: String!) {
            createWorkorder(qrcode: $qrcode) {
                id
                qrcode
                detail
                createdAt
                priority
                status
                title
            }
        }
    `
    console.log('TCL: props', props)
    // const qrcode = props.navigation.state.params.qrData
    const { loading, error, data } = useQuery(CHECK_FOR_WORKORDER, {
        variables: { qrcode: props.navigation.state.params.qrData },
    })
    // BARCODE FOR TESTING HERE
    // const qrcode = "n1706";

    if (loading)
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="black" />
                {/* <Text style={wOList.title}>
          Loading
          {console.log(loading)}
        </Text> */}
            </SafeAreaView>
        )
    if (error)
        return (
            <SafeAreaView style={styles.container}>
                {/* <Text style={wOList.title}>Error :(  */}
                {console.log(error)}
                {/* </Text> */}
            </SafeAreaView>
        )

    const yesWorkOrder = props => {
        props.navigation.navigate('EditWorkOrder', { data: data })
    }
    const newWorkOrder = props => {
        const [createWorkorder, { loading, error }] = useMutation(
            CREATE_WORK_ORDER,
            {
                onCompleted({ createWorkorder }) {
                    const qrcode = createWorkorder.qrcode
                    client.writeData({ data: { isLoggedIn: true } })
                    props.navigation.navigate('NewWorkOrder', {
                        qrcode: qrcode,
                    })
                },
            }
        )
    }
    return data.workorder.id ? yesWorkOrder() : newWorkOrder()

    //     //CHECK TO SEE IF QR AND SEND BACK 10/16/2019 SD
    //     if (!qrcode) {
    //         props.navigation.navigate('BarCodeScanner')
    //     } else {
    //         //RUN THE MUTATION
    //         //TODO NEEDS TO BE MOVED OUT OF THIS FILE SD 10/16/19

    //         //   TOKEN IS NOT CONSTANT!!!!!!!!!!!!!!!!!!!!!!!!!!
    //         axios({
    //             method: 'post',
    //             url: 'https://netgiver-stage.herokuapp.com/graphql',
    //             headers: {
    //                 'x-token': token,
    //             },

    //             data: {
    //                 query: getMutation,
    //             },
    //         }).then(res => {
    //             const isWorkOrder = res.data.data
    //             if (isWorkOrder) {
    //                 //IF THERE IS A QR CODE OF THAT VALUE SEND TO EDIT PAGE
    //                 //WITH WORKORDER PROPS PASSED TO IT
    //                 props.navigation.navigate('EditWorkOrder', {
    //                     workOrder: { isWorkOrder },
    //                     token: token,
    //                 })
    //                 console.log('yesWorkOrder')
    //             } else {
    //                 // IF THERE IS NOT AN EXISTING QR CODE SEND TO THE NEWWORKORDER SCREEN AND SEND THE QR CODE TO THE SCREEN AS PROPS 10/24/2019 SD
    //                 axios({
    //                     method: 'post',
    //                     url: 'https://netgiver-stage.herokuapp.com/graphql',
    //                     headers: {
    //                         'x-token': token,
    //                     },
    //                     data: {
    //                         query: createMutation,
    //                     },
    //                 }).then(res => {
    //                     console.log('created')
    //                     props.navigation.navigate('NewWorkOrder', {
    //                         qrcode: { qrcode },
    //                         token: token,
    //                     })
    //                 })
    //             }
    //         })
    //     }
    //     //DISPLAYS A SPINNER IN CASE OF LOAD TIME 10/16/19 SD

    //     //TODO: NEEDS TO BE STYLED SD 10/16/19
    //     return (
    //         <>
    //             <View style={styles.container}>
    //                 <ActivityIndicator size="large" color="black" />
    //             </View>
    //         </>
    //     )
    // }
}
export default CheckBarCode
