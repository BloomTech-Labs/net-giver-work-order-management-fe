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
import { token } from '../../../token'
import axios from 'axios'
import { wOForm } from '../../../components/Styles'
import {StackActions, NavigationActions} from 'react-navigation'
import { UserContext } from "../../../context/userState";
// import {token} from '../../../token'
const EditWorkOrder = props => {
<<<<<<< HEAD
    const { user } = useContext(UserContext)
    const token = user.token
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'WorkOrderList' })],
      })
      const resetAction1 = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'EditWorkOrder' })],
      })
 
    const {qrcode} = props.navigation.state.params.workOrder.isWorkOrder.workorder
console.log("TCL: props", props)
=======
    // const token = props.navigation.state.params.token

    const { qrcode } = 'n7739'
    // } = props.navigation.state.params.workOrder.isWorkOrder.workorder
    console.log('TCL: props', props)
>>>>>>> 6d88a32c30a5edfb8e511e7357312892cfd7b5ca
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
    const [priority, setPriority] = useState(
        'priority'
        // props.navigation.state.params.workOrder.isWorkOrder.workorder.priority
    )
    // SET STATUS 10/24/2019 SD
    const [status, setStatus] = useState(
        'status'
        // props.navigation.state.params.workOrder.isWorkOrder.workorder.status
    )
    //SET TITLE 10/24/2019 SD
    const [title, setTitle] = useState(
        'title'
        // props.navigation.state.params.workOrder.isWorkOrder.workorder.title
    )
    //SET DETAIL 10/24/2019 SD`
    const [detail, setDetail] = useState(
        'detail'
        // props.navigation.state.params.workOrder.isWorkOrder.workorder.detail
    )
    const [activePriority, setActivePriority] = useState(0)

    const [activeStatus, setActiveStatus] = useState(0)

    //SET BUTTONS AND CANCEL_INDEX FOR ACTIONSHEET 12/24/2019 SD
    const BUTTONS = [
        { text: 'Take Picture with Camera' },
        { text: 'Use Existing Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2
    //SET QR CODE FROM PROPS 10/24/2019 SD

    // const ternbg = `? {backgroundColor: "black"} : {backgroundColor:white}`

    console.log('TCL: qrcode', qrcode)
    //SUBMIT HANDLER 10/24/2019 SD
    const handleSubmit = () => {
        const editMutation = `mutation {
            editWorkorder( qrcode: "${qrcode}", detail: "${detail}", priority: "${priority}", status: "${status}", title: "${title}"){
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
            props.navigation.navigate('WorkOrderList', {sentFrom:'EditWorkOrder', token:token})
            props.navigation.dispatch(resetAction);
            // props.navigation.dispatch(resetAction1);
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
                                style={[
                                    wOForm.pBarButton,

                                    activePriority === 1
                                        ? {
                                              backgroundColor: '#237804',
                                          }
                                        : { backgroundColor: 'white' },
                                ]}
                                onPress={() => {
                                    setPriority('Low')
                                    setActivePriority(1)
                                }}
                            >
                                <Text
                                    style={[
                                        activePriority === 1
                                            ? {
                                                  color: 'white',
                                              }
                                            : { color: '#237804' },
                                    ]}
                                >
                                    Low
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    wOForm.pBarButton,

                                    activePriority === 2
                                        ? {
                                              backgroundColor: '#237804',
                                          }
                                        : { backgroundColor: 'white' },
                                ]}
                                onPress={() => {
                                    setPriority('Medium')
                                    setActivePriority(2)
                                }}
                            >
                                <Text
                                    style={[
                                        activePriority === 2
                                            ? {
                                                  color: 'white',
                                              }
                                            : { color: '#237804' },
                                    ]}
                                >
                                    Medium
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    wOForm.pBarButton,

                                    activePriority === 3
                                        ? {
                                              backgroundColor: '#237804',
                                          }
                                        : { backgroundColor: 'white' },
                                ]}
                                onPress={() => {
                                    setPriority('High')
                                    setActivePriority(3)
                                }}
                            >
                                <Text
                                    style={[
                                        activePriority === 3
                                            ? {
                                                  color: 'white',
                                              }
                                            : { color: '#237804' },
                                    ]}
                                >
                                    High
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    wOForm.pBarButton,

                                    activePriority === 4
                                        ? {
                                              backgroundColor: '#237804',
                                          }
                                        : { backgroundColor: 'white' },
                                ]}
                                onPress={() => {
                                    setPriority('Emergency')
                                    setActivePriority(4)
                                }}
                            >
                                <Text
                                    style={[
                                        activePriority === 4
                                            ? {
                                                  color: 'white',
                                              }
                                            : { color: '#237804' },
                                    ]}
                                >
                                    Emergency
                                </Text>
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
                            style={[
                                wOForm.pBarButton,

                                activeStatus === 1
                                    ? {
                                          backgroundColor: '#237804',
                                      }
                                    : { backgroundColor: 'white' },
                            ]}
                            onPress={() => {
                                setStatus('Not Started')
                                setActiveStatus(1)
                            }}
                        >
                            <Text
                                style={[
                                    activeStatus === 1
                                        ? {
                                              color: 'white',
                                          }
                                        : { color: '#237804' },
                                ]}
                            >
                                Not Started
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                wOForm.pBarButton,

                                activeStatus === 2
                                    ? {
                                          backgroundColor: '#237804',
                                      }
                                    : { backgroundColor: 'white' },
                            ]}
                            onPress={() => {
                                setStatus('In Progress')
                                setActiveStatus(2)
                            }}
                        >
                            <Text
                                style={[
                                    activeStatus === 2
                                        ? {
                                              color: 'white',
                                          }
                                        : { color: '#237804' },
                                ]}
                            >
                                In Progress
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                wOForm.pBarButton,

                                activeStatus === 3
                                    ? {
                                          backgroundColor: '#237804',
                                      }
                                    : { backgroundColor: 'white' },
                            ]}
                            onPress={() => {
                                setStatus('Complete')
                                setActiveStatus(3)
                            }}
                        >
                            <Text
                                style={[
                                    activeStatus === 3
                                        ? {
                                              color: 'white',
                                          }
                                        : { color: '#237804' },
                                ]}
                            >
                                Complete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text>Work Order Images (Long Press to Delete)</Text>
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

export default EditWorkOrder
