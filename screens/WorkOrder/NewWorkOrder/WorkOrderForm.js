import React, { useState, useEffect } from 'react'
import {
    ScrollView,
    View,
    TextInput,
    // Text,
    Alert,
    Image,
    SafeAreaView,
    Picker,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {
    Container,
    Header,
    Button,
    Content,
    ActionSheet,
    Text,
} from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { token } from '../../../token'
import axios from 'axios'
// import { Button, InputItem } from '@ant-design/react-native'
import { wOForm } from '../../../components/Styles'
import ChooseCamera from '../../../components/camera/ChooseCamera'

function Form(props) {
    console.log('TCL: Form -> props', props)
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
    
    console.log('props', props)
    var {
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
        navigation,
    } = props
    // REDIRECTS TO CAMERA PAGE SO THAT YOU CAN TAKE A PICTURE SENDS PAGE SENTFROM PROPS SO THAT IT CAN EASILY BE SENT BACK UPON TAKING THE PHOTO  10/24/2019 SD
    const camRedirect = () => {() => {props.navigation.navigate('Camera', {sentFrom:'NewWorkOrder'})}};
    // REDIRECTS TO IMG GALLERY PAGE SO THAT YOU CAN TAKE A PICTURE SENDS PAGE SENTFROM PROPS SO THAT IT CAN EASILY BE SENT BACK UPON TAKING THE PHOTO  10/24/2019 SD
    const galRedirect = () => {() => {props.navigation.navigate('Gallery', { sentFrom: 'NewWorkOrder'})}}
    //SET BUTTONS FOR ACTIONSHEET 12/24/2019 SD
    const BUTTONS = [
        { text: 'Take Picture with Camera', onPress:camRedirect() },
        { text: 'Use Existing Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2
    // const qrcode = props.navigation.state.params.qrCode
          return (
            <ScrollView>
                <View>
                    <View style={{ marginTop: 15 }}>
                        {/* TITLE TEXT INPUT 12/24/2019 SD */}
                        <TextInput
                            placeholder="What is broken?"
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            style={wOForm.textInput}
                        />
                    </View>

                    <Text>
                        {errors.title && touched.title ? errors.title : null}
                    </Text>
                    <View>
                        <TextInput
                            // DETAIL TEXT INPUT 12/24/2019 SD
                            placeholder="What's it doing?"
                            // textContentType={'detail'}
                            onChangeText={handleChange('detail')}
                            onBlur={handleBlur('detail')}
                            value={values.detail}
                            style={wOForm.textInput}
                        />
                    </View>
                    {/* THROW ERROR IF DETAIL IS NOT CORRECT 12/24/2019 SD */}
                    {/* NEEDS TO BE STYLED
                    NEEDS TO BE STYLED
                    NEEDS TO BE STYLED12/24/2019 SD */}
                    <Text>
                        {errors.detail && touched.detail ? errors.detail : null}
                    </Text>

                    <View>
                        <View style={wOForm.priorityBar}>
                            <View style={wOForm.pBarTextBox}>
                                <Text style={wOForm.pBarText}>Priority:</Text>
                            </View>
                            <View style={wOForm.pBarButtonBox}>
                                <TouchableOpacity style={wOForm.pBarButton}>
                                    <Text>N/A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={wOForm.pBarButton}>
                                    <Text>Low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={wOForm.pBarButton}>
                                    <Text>Medium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={wOForm.pBarButton}>
                                    <Text>High</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={wOForm.pBarButton}>
                                    <Text>Emergency</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={wOForm.priorityBar}>
                        <View style={wOForm.pBarTextBox}>
                            <Text style={wOForm.pBarText}>Status: </Text>
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

                    <Text>Work Order Images (Long Press to Delete)</Text>
                    {/* WORK ORDER IMAGE BOX 12/24/2019 SD */}
                    <View style={wOForm.imageBox}>
                        
                        <View style={wOForm.image}>
                            {/* TURN IMAGE INTO BUTTON WITH LONGPRESS THAT WILL DELETE THE PHOTO
                            DELETE NEEDS FUNCTIONALITY 12/24/2019 SD */}
                            <TouchableOpacity onLongPress={() => 
                            handlePhotoDelete()
                            }>
                                <Image
                                    style={wOForm.placeholder}
                                    source={{
                                        uri: img1,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={wOForm.image}>
                        <TouchableOpacity onLongPress={() => 
                            handlePhotoDelete()
                            }>
                                <Image
                                    style={wOForm.placeholder}
                                    source={{
                                        uri: img2,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={wOForm.image}>
                        <TouchableOpacity onLongPress={() => 
                            handlePhotoDelete()
                            }>
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
                            onPress={handleSubmit}
                            color="white"
                        >
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    
}

function WorkOrderForm(props) {
    // const {qrCode} = props.navigation.state.params.qrCode
    const { qrCode } = 7

    console.log('TCL: WorkOrderForm -> props', props)
    var schema = Yup.object().shape({
        title: Yup.string(),
        detail: Yup.string()
            .min(6)
            .required(),
        priority: Yup.string().required(),
        status: Yup.string().required(),
    })
    var { navigation } = props
    return (
        <View>
            <View>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        title: '',
                        detail: '',
                        priority: '',
                        status: '',
                        qrcode: qrCode,
                    }}
                    onSubmit={(values, formikBag, props) => {
                        // console.log("on submit props", props)
                        // console.log("values", values)
                        // console.log("formik bag", formikBag)
                        // console.log("qr code", qrcode)
                        // console.log("values detail", values.detail)
                        //     const qrcode = "00000"
                        const editMutation = `mutation {
                            editWorkorder( qrcode: "${values.qrcode}", detail: "${values.detail}", priority: "${values.priority}", status: "${values.status}", title: "${values.title}"){
                              qrcode
                              detail
                              priority
                              status
                              title
                            }
                          }`
                        console.log('values.qrcode', values.qrcode)
                        console.log('token', token)
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
                            console.log('response', res)
                        })
                    }}
                    render={props => {
                        return <Form {...props} navigation={navigation} />
                    }}
                />
            </View>
        </View>
    )
}
export default WorkOrderForm
