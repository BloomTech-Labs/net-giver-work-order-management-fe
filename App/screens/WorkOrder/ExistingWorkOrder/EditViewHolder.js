import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { token } from '../../../token'
import axios from 'axios'
//THIS IS THE EDIT / VIEW WORK ORDER COMPONENT AFTER THE BARCODE IS FOUND...

const EditViewHolder = props => {
    const hideButton = e => {
        setHide(false)
    }

    const workOrderProps =
        props.navigation.state.params.workOrder.isWorkOrder.workorder
    const title = workOrderProps.title
    const details = workOrderProps.detail
    const priority = workOrderProps.priority
    const workOrderStatus = workOrderProps.workOrderStatus
    const qrcode = workOrderProps.qrcode
    console.log('work order props title', workOrderProps.title)

    const [hide, setHide] = useState(true)
    const [status, setStatus] = useState(workOrderStatus)
    console.log('TCL: status', status)

    const onSubmit = () => {}

    const editMutation = `mutation {
    editWorkorder( qrcode: "${qrcode}", status: "${status}"){
    status
    }
    }`

    // useEffect(() => {
    //   hideButton;
    // }, [hide]);

    // useEffect(() => {
    //   axios({
    //     method: "post",
    //     url: "https://netgiver-stage.herokuapp.com/graphql",
    //     headers: {
    //       "x-token": token
    //     },
    //     data: {
    //       query: editMutation
    //     }
    //   }).then(res => {
    //     console.log("response", res);
    //   });
    // }, [status]);

    //WORKORDER PROPS ARE PASSED IN FROM THE CHECKBARCODE PAGE
    console.log(
        'TCL: Workorder -> props',
        props.navigation.state.params.workOrder.isWorkOrder.workorder
    )
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    PLACEHOLDER FOR EDIT/VIEW AFTER BARCODE SCANNED
                </Text>
                <Text> {title} </Text>
                <Text> {details} </Text>
                <Text> {priority} </Text>
                {/* highlight priority */}

                <Text>Status</Text>
                <View>
                    <View>
                        <TouchableOpacity
                            onPress={() => setStatus('Not Yet Started')}
                        >
                            <Text>Not Yet Started</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => setStatus('In Progress')}
                        >
                            <Text>In Progress</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setStatus('Complete')}>
                            <Text>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
})

export default EditViewHolder

//SD 10/16/19 PLACEHOLDER
