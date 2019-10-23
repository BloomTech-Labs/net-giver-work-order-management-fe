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
                            style={styles.textInput}
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
                            style={styles.textInput}
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
                        <View style={styles.priorityBar}>
                            <View style={styles.pBarTextBox}>
                                <Text style={styles.pBarText}>Priority:</Text>
                            </View>
                            <View style={styles.pBarButtonBox}>
                                <TouchableOpacity style={styles.pBarButton}>
                                    <Text>N/A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pBarButton}>
                                    <Text>Low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pBarButton}>
                                    <Text>Medium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pBarButton}>
                                    <Text>High</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pBarButton}>
                                    <Text>Emergency</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.priorityBar}>
                        <View style={styles.pBarTextBox}>
                            <Text style={styles.pBarText}>Status: </Text>
                        </View>
                        <View style={styles.pBarButtonBox}>
                            <TouchableOpacity style={styles.pBarButton}>
                                <Text>Not Started</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pBarButton}>
                                <Text>In Progress</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pBarButton}>
                                <Text>Complete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View>
                        <Button style={styles.button} onPress={hideButton}>
                            <Text>ChoosePhoto</Text>
                        </Button>
                    </View> */}
                    <View style={styles.imageBox}>
                        <Image
                            style={styles.placeholder}
                            source={{
                                uri:
                                    img
                            }}
                        />
                    </View>
                    <View>
                        <Button type='primary' style={styles.button} onPress={handleSubmit} color='white'>
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
                        <View style={styles.display}>
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
const styles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    button: {
        backgroundColor: '#006E13',
        borderWidth: 2,
        borderColor: '#EDF1F3',
        width: '96%',
        alignSelf: 'center',
    },
    textInput: {
        marginBottom: 15,
        backgroundColor: '#EDF1F3',
        borderWidth: 2,
        borderColor: '#C5C2C2',
        // box-sizing: border-box;
        borderRadius: 4,
        // alignSelf: "stretch",
        width: '95%',
        alignSelf: 'center',
        padding: 10,
    },
    priorityBar: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    pBarText: {
        marginLeft: 10,
    },
    pBarButtonBox: {
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        borderRightWidth: 0.5,
        borderRadius: 4,
    },
    pBarButton: {
        // borderWidth: 0.5,
        // borderRadius:4,
        borderRightWidth: 0.5,
        padding: 2,
        // borderTopRightRadius:4,
        // borderBottomRightRadius:4,
    },
    placeholder:{
        width:200,
        height:200,
        alignSelf:'center',
        marginBottom:25,
        borderRadius:100,
    },
})

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
