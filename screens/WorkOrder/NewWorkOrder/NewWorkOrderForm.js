import React, { useState, useEffect, useContext } from 'react'
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
    Left,
    Body,
    Right,
    Button,
    ActionSheet,
    Icon,
    Title,
    Segment,
    Content,
    Text,
} from 'native-base'
// import { token } from '../../../token'
import axios from 'axios'
// import { wOForm } from '../../../components/Styles'
// import {token} from '../../../token'
import { StackActions, NavigationActions } from 'react-navigation'
import { UserContext } from '../../../context/userState'

const NewWorkOrderForm = props => {
    const { user } = useContext(UserContext)
    const token = user.token
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'WorkOrderList' })],
    })
    const resetAction1 = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'BarCodeScanner' })],
    })
    console.log('TCL: props', props)
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
    const [priority, setPriority] = useState('N/A')
    // SET STATUS 10/24/2019 SD
    const [status, setStatus] = useState('Not Started')
    //SET TITLE 10/24/2019 SD
    const [title, setTitle] = useState()
    //SET DETAIL 10/24/2019 SD`
    const [detail, setDetail] = useState()
    //SET BUTTONS AND CANCEL_INDEX FOR ACTIONSHEET 12/24/2019 SD
    const BUTTONS = [
        { text: 'Take Picture with Camera' },
        { text: 'Use Existing Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2
    //SET QR CODE FROM PROPS 10/24/2019 SD
    const { qrCode } = props.navigation.state.params.qrCode
    console.log('TCL: qrCode', qrCode)
    //SUBMIT HANDLER 10/24/2019 SD
    const handleSubmit = () => {
        const editMutation = `mutation {
            editWorkorder( qrcode: "${qrCode}", detail: "${detail}", priority: "${priority}", status: "${status}", title: "${title}"){
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
            props.navigation.dispatch(resetAction1)
            props.navigation.navigate('WorkOrderList', {
                sentFrom: 'NewWorkOrder',
                token: token,
            })
            props.navigation.dispatch(resetAction)
        })
    }

    return (
        <ScrollView>
            <View>
                <View style={{ marginTop: 15 }}>
                    {/* TITLE TEXT INPUT 12/24/2019 SD */}
                    <TextInput
                        placeholder="What is broken?"
                        onChangeText={setTitle}
                        value={title}
                        style={wOForm.textInput}
                    />
                </View>
                <View>
                    <TextInput
                        // DETAIL TEXT INPUT 12/24/2019 SD
                        placeholder="What's it doing?"
                        onChangeText={setDetail}
                        value={detail}
                        style={wOForm.textInput}
                    />
                </View>
                <View>
                    <View style={wOForm.priorityBar}>
                        <View style={wOForm.pBarTextBox}>
                            <Text style={wOForm.pBarText}>Priority:</Text>
                        </View>
                        <View style={wOForm.pBarButtonBox}>
                            <TouchableOpacity
                                style={wOForm.pBarButton}
                                onPress={() => setPriority('N/A')}
                            >
                                <Text>N/A</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={wOForm.pBarButton}
                                onPress={() => setPriority('Low')}
                            >
                                <Text>Low</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={wOForm.pBarButton}
                                onPress={() => setPriority('Medium')}
                            >
                                <Text>Medium</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={wOForm.pBarButton}
                                onPress={() => setPriority('High')}
                            >
                                <Text>High</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={wOForm.pBarButton}
                                onPress={() => setPriority('Emergency')}
                            >
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
                        <TouchableOpacity
                            style={wOForm.pBarButton}
                            onPress={() => setStatus('Not Started')}
                        >
                            <Text>Not Started</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={wOForm.pBarButton}
                            onPress={() => setStatus('In Progress')}
                        >
                            <Text>In Progress</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={wOForm.pBarButton}
                            onPress={() => setStatus('Complete')}
                        >
                            <Text>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <Text>Work Order Images (Long Press to Delete)</Text> */}
                {/* WORK ORDER IMAGE BOX 12/24/2019 SD */}
                {/* <View style={wOForm.imageBox}> */}
                {/* <View style={wOForm.image}> */}
                {/* TURN IMAGE INTO BUTTON WITH LONGPRESS THAT WILL DELETE THE PHOTO
                            DELETE NEEDS FUNCTIONALITY 12/24/2019 SD */}
                {/* <TouchableOpacity
                            onLongPress={() => handlePhotoDelete()}
                        >
                            <Image
                                style={wOForm.placeholder}
                                source={{
                                    uri: img1,
                                }}
                            />
                        </TouchableOpacity>
                    </View> */}
                {/* <View style={wOForm.image}>
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
                    </View> */}
                {/* <View style={wOForm.image}>
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
                </View> */}
                {/* <Content padder> */}
                {/* ACTIONSHEET HAS CAMERA BUTTONS IN IT TO REDIRECT TO CAMERA 10/24/2019 SD */}
                {/* <Button
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
                    </Button> */}
                {/* </Content> */}
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
const wOForm = StyleSheet.create({
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
    placeholder: {
        width: 75,
        height: 75,
        // alignSelf:'center',
        // marginBottom:25,
        // borderRadius:100,
    },
    imageBox: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        padding: 10,
    },
})
export default NewWorkOrderForm
