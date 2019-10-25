import React, { Component, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Image,
} from 'react-native'
import { Formik } from 'formik'
import {
    Container,
    Header,
    Button,
    Content,
    ActionSheet,
    Text,
} from 'native-base'
import { token } from '../../../token'
import axios from 'axios'
import { styles, wOForm } from '../../../components/Styles'

//THIS IS THE EDIT / VIEW WORK ORDER COMPONENT AFTER THE BARCODE IS FOUND...

const EditWorkOrder = props => {
    console.log('TCL: props', props.navigation.state.params)
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

    console.log('props', props)

    // REDIRECTS TO CAMERA PAGE SO THAT YOU CAN TAKE A PICTURE SENDS PAGE SENTFROM PROPS SO THAT IT CAN EASILY BE SENT BACK UPON TAKING THE PHOTO  10/24/2019 SD
    const camRedirect = e => {
        {
            props.navigation.navigate('CameraModule', {
                sentFrom: 'NewWorkOrder',
            })
        }
    }
    // REDIRECTS TO IMG GALLERY PAGE SO THAT YOU CAN TAKE A PICTURE SENDS PAGE SENTFROM PROPS SO THAT IT CAN EASILY BE SENT BACK UPON TAKING THE PHOTO  10/24/2019 SD
    const galRedirect = () => {
        ;() => {
            props.navigation.navigate('Gallery', { sentFrom: 'NewWorkOrder' })
        }
    }
    //SET BUTTONS FOR ACTIONSHEET 12/24/2019 SD
    const BUTTONS = [
        { text: 'Take Picture with Camera', onPress: camRedirect() },
        { text: 'Use Existing Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2
    // const qrcode = props.navigation.state.params.qrCode
    // const workOrderProps = null
    // props.navigation.state.params.workOrder.isWorkOrder.workorder ||
    // 'no props'
    const title = 'this title'
    console.log('TCL: title', title)
    const details = 'these details'
    const priority = '4'
    const workOrderStatus = '3'
    const qrcode = '12345'
    const photoURL = 'https://picsum.photos/200'
    const username = 'laura'
    const createdAt = '1599954778'

    // const title = workOrderProps.title || 'this title'
    // const details = workOrderProps.detail || 'these details'
    // const priority = workOrderProps.priority || '4'
    // const workOrderStatus = workOrderProps.workOrderStatus || '3'
    // const qrcode = workOrderProps.qrcode
    // console.log('work order props title', workOrderProps.title)

    const [status, setStatus] = useState(workOrderStatus)
    console.log('TCL: status', status)

    const onSubmit = () => {}

    const editMutation = `mutation {
    editWorkorder( qrcode: "${qrcode}", status: "${status}"){
    status
    }
    }`

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
    // console.log(
    //     'TCL: Workorder -> props',
    //     props.navigation.state.params.workOrder.isWorkOrder.workorder
    // )
    return (
        <Formik
            onSubmit={value => {}}
            render={props => {
                return (
                    <ScrollView>
                        <View>
                            <View style={{ marginTop: 15 }}>
                                {/* TITLE TEXT INPUT 12/24/2019 SD */}
                                <TextInput
                                    placeholder="What is broken?"
                                    onChangeText={props.handleChange('title')}
                                    onBlur={props.handleBlur('title')}
                                    value={props.values.title}
                                    style={wOForm.textInput}
                                />
                            </View>

                            <Text>
                                {props.errors.title && props.touched.title
                                    ? props.errors.title
                                    : null}
                            </Text>
                            <View>
                                <TextInput
                                    // DETAIL TEXT INPUT 12/24/2019 SD
                                    placeholder="What's it doing?"
                                    // textContentType={'detail'}
                                    onChangeText={props.handleChange('detail')}
                                    onBlur={props.handleBlur('detail')}
                                    value={props.values.detail}
                                    style={wOForm.textInput}
                                />
                            </View>
                            {/* THROW ERROR IF DETAIL IS NOT CORRECT 12/24/2019 SD */}
                            {/* NEEDS TO BE STYLED
                    NEEDS TO BE STYLED
                    NEEDS TO BE STYLED12/24/2019 SD */}
                            <Text>
                                {props.errors.detail && props.touched.detail
                                    ? props.errors.detail
                                    : null}
                            </Text>

                            <View>
                                <View style={wOForm.priorityBar}>
                                    <View style={wOForm.pBarTextBox}>
                                        <Text style={wOForm.pBarText}>
                                            Priority:
                                        </Text>
                                    </View>
                                    <View style={wOForm.pBarButtonBox}>
                                        <TouchableOpacity
                                            style={wOForm.pBarButton}
                                        >
                                            <Text>N/A</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={wOForm.pBarButton}
                                        >
                                            <Text>Low</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={wOForm.pBarButton}
                                        >
                                            <Text>Medium</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={wOForm.pBarButton}
                                        >
                                            <Text>High</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={wOForm.pBarButton}
                                        >
                                            <Text>Emergency</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={wOForm.priorityBar}>
                                <View style={wOForm.pBarTextBox}>
                                    <Text style={wOForm.pBarText}>Status:</Text>
                                </View>
                                <View style={wOForm.pBarButtonBox}>
                                    <TouchableOpacity style={wOForm.pBarButton}>
                                        <Text>Not Started</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={wOForm.pBarButton}>
                                        <Text>In Progress</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={wOForm.pBarButton}>
                                        <Text>Complete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text>
                                Work Order Images (Long Press to Delete)
                            </Text>
                            {/* WORK ORDER IMAGE BOX 12/24/2019 SD */}
                            <View style={wOForm.imageBox}>
                                <View style={wOForm.image}>
                                    {/* TURN IMAGE INTO BUTTON WITH LONGPRESS THAT WILL DELETE THE PHOTO
                            DELETE NEEDS FUNCTIONALITY 12/24/2019 SD */}
                                    <TouchableOpacity
                                        onLongPress={() => handlePhotoDelete()}
                                    >
                                        <Image
                                            style={wOForm.placeholder}
                                            source={{
                                                uri: img1,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={wOForm.image}>
                                    <TouchableOpacity
                                        onLongPress={() => handlePhotoDelete()}
                                    >
                                        <Image
                                            style={wOForm.placeholder}
                                            source={{
                                                uri: img2,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={wOForm.image}>
                                    <TouchableOpacity
                                        onLongPress={() => handlePhotoDelete()}
                                    >
                                        <Image
                                            style={wOForm.placeholder}
                                            source={{
                                                uri: img3,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Content padder>
                                {/* ACTIONSHEET HAS CAMERA BUTTONS IN IT TO REDIRECT TO CAMERA 10/24/2019 SD */}
                                <Button
                                    bordered
                                    danger
                                    onPress={() =>
                                        ActionSheet.show(
                                            {
                                                options: BUTTONS,
                                                cancelButtonIndex: CANCEL_INDEX,
                                                title: 'Choose a Photo',
                                            },
                                            buttonIndex => {
                                                setClicked(BUTTONS[buttonIndex])
                                            }
                                        )
                                    }
                                >
                                    <Text>Choose a Photo</Text>
                                </Button>
                            </Content>
                            <View>
                                {/* SUBMIT BUTTON 10/24/2019 SD */}
                                <Button
                                    type="primary"
                                    style={wOForm.button}
                                    onPress={props.handleSubmit}
                                    color="white"
                                >
                                    <Text>Submit</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                )
            }}
        />
    )
}

export default EditWorkOrder

//SD 10/16/19 PLACEHOLDER
