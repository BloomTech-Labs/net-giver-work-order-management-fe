import React, { useState, useEffect } from "react";
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
    // Icon,
    Title,
    Segment,
    Content,
    Text,
} from 'native-base'
import { Icon } from "react-native-elements";
import axios from "axios";
import { wOList } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";


export const EDIT_WORK_ORDER = gql`
  mutation editWorkOrder(
    $qrcode: String!
    $detail: String!
    $priority: String
    $status: String
    $title: String!
  ) {
    editWorkorder(
      qrcode: $qrcode
      detail: $detail
      priority: $priority
      status: $status
      title: $title
    ) {
      qrcode
      detail
      priority
      status
      title
    }
  }
`;
export const UPLOAD_ORDER_PHOTO = gql`
  mutation uploadPhoto(
    $photo: String!
    $workorderId: ID!
    $primaryPhoto: Boolean!
    $commentId: ID
  ) {
    uploadPhoto(
      photo: $photo
      workorderId: $workorderId
      primaryPhoto: $primaryPhoto
      commentId: $commentId
    ) {
      path
    }
  }
`;

const placeholderUri =
  "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

const NewWorkOrderForm = props => {
    const [photo, setPhoto] = useState(
        {
          uri: placeholderUri,
          type: null,
          name: null
        }
    );

    const [workorderphoto, setWorkorderphoto] = useState(photo.uri);
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('In Progress');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    //const [workorderphotos, setWorkorderphotos] = useState(wo.workorderphotos);
    
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "WorkOrderList" })]
      });
      const resetAction1 = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "BarCodeScanner" })]
      });

    //SET QR CODE FROM PROPS 10/24/2019 SD
    const { qrcode } = props.navigation.state.params.qrcode //12345555

    console.log(qrcode);
    const { workOrderId } = props.navigation.state.params.qrcode //1
  
    //console.log("TCL: qrcode", qrcode);
    //SUBMIT HANDLER 10/24/2019 SD
    const [editWorkOrder, { data, loading, error }] = useMutation(
        EDIT_WORK_ORDER
    );

    /*
    const statusArray = [
        {
            type: '1 Open',
            name: 'Open',
            iconName: 'unlock',
        },
        {
            type: '2 OnHold',
            name: 'On Hold',
            iconName: 'pause',
        },
        {
            type: '3 InProgress',
            name: 'In Progress',
            iconName: 'sync',
        },
        {
            type: '4 Complete',
            name: 'Complete',
            iconName: 'lock',
        },
    ]
    */

    const priorityArray = [
        {
            type: '1 Low',
            name: 'Low',
            color: '#087FFF',
            backgroundColor: '#E2F5FC',
        },
        {
            type: '2 Medium',
            name: 'Medium',
            color: '#07BD51',
            backgroundColor: '#CBFBCB',
        },
        {
            type: '3 High',
            name: 'High',
            color: '#DBA004',
            backgroundColor: '#FFED9B',
        },
        {
            type: '4 Urgent',
            name: 'Urgent',
            color: '#FE273A',
            backgroundColor: '#FFD3D3',
        },
    ]

    const handleSubmit = () => {

        editWorkOrder({
          variables: {
            qrcode: qrcode,
            title: title,
            detail: detail,
            status: status,
            priority: priority
          }
        });
      };

      console.log("WORK ORDER NEW")
    


    
    return (
        <ScrollView style={{ backgroundColor: '#f8f5f4' }}>
            <View>
                <View style={{ marginTop: 15 }}>
                    {/* TITLE TEXT INPUT 12/24/2019 SD */}
                    <TextInput
                        placeholder="Work Order Title*"
                        onChangeText={setTitle}
                        value={title}
                        style={wOForm.textInput}
                    />
                </View>
                <View>
                    <TextInput
                        // DETAIL TEXT INPUT 12/24/2019 SD
                        placeholder="Detailed Description"
                        onChangeText={setDetail}
                        value={detail}
                        style={wOForm.textInput1}
                        editable={true}
                        multiline={true}
                    />
                </View>

                {/*
                <View style={wOForm.statusDiv}>
                    {statusArray.map((item, index) => {
                        return (
                            // THIS IS FOR STYLING UPDATE STATUS
                            <TouchableOpacity
                                onPress={() => setStatus(item.type)}
                                style={[
                                    wOForm.statusButtons,
                                    {
                                        backgroundColor:
                                            status === item.type
                                                ? 'green'
                                                : 'white',
                                    },
                                ]}
                            >
                                <Icon
                                    color={
                                        status === item.type ? 'white' : 'green'
                                    }
                                    type="antdesign"
                                    name={item.iconName}
                                />
                                <Text
                                    style={[
                                        wOForm.statusButtonsText,
                                        {
                                            color:
                                                status === item.type
                                                    ? 'white'
                                                    : 'green',
                                        },
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                */}
                
                <View style={wOForm.priorityDiv}>
                    <View style={{ backgroundColor: 'white', fontSize: 15, paddingVertical: 4 }}>
                        <Text>Tap to update priority:</Text>
                    </View>
                    <View style={wOForm.priorityButtonsDiv}>
                    {priorityArray.map((item, index) => {
                        return (
                            // THIS IS FOR STYLING UPDATE PRIORITY
                            <TouchableOpacity
                                onPress={() => setPriority(item.name)}
                                style={[
                                    wOForm.priorityButtons,
                                    {
                                        backgroundColor:
                                            priority === item.name
                                                ? item.backgroundColor
                                                : '#F4F3F3',
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        wOForm.priorityButtonsText,
                                        {
                                            color:
                                                priority === item.name
                                                    ? item.color
                                                    : '#89898E',
                                        },
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>
                </View>
                {/* SUBMIT BUTTON 10/24/2019 SD */}
                <Button
                    type="primary"
                    style={wOForm.button}
                    onPress={() => {handleSubmit()}}
                    color="white"
                >
                    <Text>Submit</Text>
                </Button>
            </View>
            {/* </View> */}
        </ScrollView>
    )
}
const wOForm = StyleSheet.create({
    imgCard: {
        borderWidth: 1,
        marginTop: 5,
        padding: 5,
        marginBottom: 5,
    },
    imgCardTop: {},
    imgCardBot: {},
    imgCardBot: {},
    touchImage: {},
    imgUpload: {
        width: 150,
        height: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    statusDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#C5C2C2',
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    statusButtons: {
        backgroundColor: '#f4f3f3',
        width: '23%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C5C2C2',
        padding: 5,
    },
    statusButtonsText: { color: '#009900', textAlign: 'center', fontSize: 14 },
    statusButtonsActive: {
        backgroundColor: '#009900',
        width: '23%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C5C2C2',
        padding: 5,
    },
    statusButtonsTextActive: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    priorityDiv: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: '#C5C2C2',
        paddingHorizontal: 15,
        paddingBottom: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    priorityButtonsDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priorityButtons: {
        backgroundColor: '#f4f3f3',
        width: '23%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C5C2C2',
        padding: 5,
        height: 55,
    },
    priorityButtonsText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    priorityButtonsActive: {
        backgroundColor: '#009900',
        width: '23%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C5C2C2',
        padding: 5,
        height: 53,
    },
    priorityButtonsTextActive: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    hidden: {
        display: 'none',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#006E13',
        borderWidth: 2,
        borderColor: '#EDF1F3',
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 175,
    },
    textInput: {
        marginTop: -15,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#ffffff',
        borderColor: '#C5C2C2',
        width: '102%',
        alignSelf: 'center',
        padding: 10,
    },
    textInput1: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#ffffff',
        borderColor: '#C5C2C2',
        width: '102%',
        alignSelf: 'center',
        padding: 10,
        height: 90,
        textAlignVertical: 'top'
    },
})
export default NewWorkOrderForm
