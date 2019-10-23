import React, { useState, useEffect } from 'react'
import {
    View,
    TextInput,
    Text,
    Alert,
    Image,
    SafeAreaView,
    Picker,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { token } from '../../../token'
import axios from 'axios'
import { Button, InputItem } from '@ant-design/react-native'
import { wOForm } from '../../../components/Styles'

function Form(props) {
    console.log('TCL: Form -> props', props)
    const [hide, setHide] = useState(true)
    const [img, setImg] = useState('http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image')
    const hideButton = e => {
        setHide(false)
    }

    useEffect(() => {
        hideButton
    }, [hide])

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

    // const qrcode = props.navigation.state.params.qrCode
    if (hide) {
        return (
            <SafeAreaView>
                <View>
                    <View style={{ marginTop: 15 }}>
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
                            placeholder="What's it doing?"
                            // textContentType={'detail'}
                            onChangeText={handleChange('detail')}
                            onBlur={handleBlur('detail')}
                            value={values.detail}
                            style={wOForm.textInput}
                        />
                    </View>

                    <Text>
                        {errors.detail && touched.detail ? errors.detail : null}
                    </Text>

                    <View>
                        {/* <Picker
                            selectedValue={values.priority}
                            onValueChange={handleChange('priority')}
                        >
                            <Picker.Item label="Emergency" value="Emergency" />
                            <Picker.Item label="High" value="High" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Low" value="Low" />
                        </Picker> */}
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

                    {/* <View>
                        <Button style={wOForm.button} onPress={hideButton}>
                            <Text>ChoosePhoto</Text>
                        </Button>
                    </View> */}
                    <View style={wOForm.imageBox}>
                        <Image
                            style={wOForm.placeholder}
                            source={{
                                uri:
                                    img
                            }}
                        />
                    </View>
                    <View>
                        <Button type='primary' style={wOForm.button} onPress={handleSubmit} color='white'>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <TextInput name="qrcode" />
                    </View>
                    <Text> Title </Text>
                    <View>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                    </View>

                    <Text>
                        {errors.title && touched.title ? errors.title : null}
                    </Text>

                    <Text>Detail</Text>

                    <View>
                        <TextInput
                            // textContentType={'detail'}
                            onChangeText={handleChange('detail')}
                            onBlur={handleBlur('detail')}
                            value={values.detail}
                        />
                    </View>

                    <Text>
                        {errors.detail && touched.detail ? errors.detail : null}
                    </Text>

                    <Text>Priority</Text>

                    <View>
                        <Picker
                            selectedValue={values.priority}
                            onValueChange={handleChange('priority')}
                        >
                            <Picker.Item label="Emergency" value="Emergency" />
                            <Picker.Item label="High" value="High" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Low" value="Low" />
                        </Picker>
                    </View>

                    <Text>Status</Text>

                    <View>
                        <Picker
                            selectedValue={values.status}
                            onValueChange={handleChange('status')}
                        >
                            <Picker.Item
                                label="Not yet Started"
                                value="Not yet Started"
                            />
                            <Picker.Item
                                label="In Progress"
                                value="In Progress"
                            />
                            <Picker.Item label="Complete" value="Complete" />
                        </Picker>
                    </View>
                    <View>
                        <View style={wOForm.display}>
                            <TouchableOpacity>
                                <Text>Choose From Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate('Camera', {
                                        from: 'workOrderFormNew',
                                    })
                                }
                            >
                                <Text>Take A Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View></View>
                </View>
            </SafeAreaView>
        )
    }
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
