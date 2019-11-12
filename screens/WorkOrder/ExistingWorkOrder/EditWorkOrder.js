import React, { useState } from 'react'
import {
    ScrollView,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import { Field, Formik } from 'formik'
import { ActionSheet, Content, Button as NativeButton, Container, } from "native-base";
import { Icon, Button } from 'react-native-elements'
import { wOForm } from '../../../components/Styles'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { PictureField } from '../../../components/shared/PictureField'
import { CameraField } from '../../../components/shared/CameraField'
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import * as Permissions from "expo-permissions";
import { fieldsConflictMessage } from "graphql/validation/rules/OverlappingFieldsCanBeMerged";


const EDIT_WO = gql`
    mutation editWorkorder(
        $qrcode: String!
        $id: ID!
        $detail: String
        $priority: String
        $status: String
        $title: String
    ) {
        editWorkorder(
            qrcode: $qrcode
            id: $id
            detail: $detail
            priority: $priority
            status: $status
            title: $title
        ) {
            id
            detail
            createdAt
            qrcode
            priority
            status
            title
            user {
                username
            }
            workorderphoto {
                path
            }
        }
    }
`

const WO_PIC = gql`
    mutation uploadWorkorderphoto($photo: Upload!, $workorderId: ID!) {
        uploadWorkorderphoto(photo: $photo, workorderId: $workorderId) {
            userId
            filename
            path
        }
    }
`

const updateWo = async ({
    values,
    editWorkorder,
    uploadWorkorderphoto,
    navigation,
}) => {
    if (values.photo.uri) {
        console.log(values.photo)
        const picresult = await uploadWorkorderphoto({
            variables: {
                photo: values.photo,
                workorderId: values.id,
            },
        })
        const editresult = await editWorkorder({
            variables: {
                id: values.id,
                qrcode: values.qrcode,
                detail: values.detail,
                priority: values.priority,
                status: values.status,
                title: values.title,
            },
        })
        navigation.goBack()
    }
    const editresult = await editWorkorder({
        variables: {
            id: values.id,
            qrcode: values.qrcode,
            detail: values.detail,
            priority: values.priority,
            status: values.status,
            title: values.title,
        },
    })

    // if (get(editresult, "data.workorder")) {
    //   // navigation.goBack();
    //   null;
    // }

    navigation.goBack()
}

const EditWorkOrder = ({ navigation }) => {
    const {
        id,
        qrcode,
        detail,
        priority,
        status,
        title,
        user,
        user: { username },
        workorderphoto,
    } = navigation.state.params

    const [wo, setWo] = useState({
        id: id,
        detail: detail,
    })
    const [editWorkorder, { loading, error }] = useMutation(EDIT_WO, {})

    const [uploadWorkorderphoto, { picloading, picerror }] = useMutation(
        WO_PIC,
        {}
    )

    const [activePriority, setActivePriority] = useState(0)

    const priorityArray = [
        {
            name: 'Low',
            color: '#087FFF',
            backgroundColor: '#E2F5FC',
        },
        {
            name: 'Medium',
            color: '#07BD51',
            backgroundColor: '#CBFBCB',
        },
        {
            name: 'High',
            color: '#DBA004',
            backgroundColor: '#FFED9B',
        },
        {
            name: 'Urgent',
            color: '#FE273A',
            backgroundColor: '#FFD3D3',
        },
    ]


    const img1 =
        'http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image'
    const BUTTONS = [
        { text: 'Gallery' },
        { text: 'Take Photo' },
        { text: 'Cancel' },
    ]
    const CANCEL_INDEX = 2;
    return (
        <Formik
            initialValues={{
                id: id,
                qrcode: qrcode,
                detail: detail,
                priority: priority,
                status: status,
                title: title,
                workorderphoto: workorderphoto,
                photo: {},
            }}
            onSubmit={async values =>
                updateWo({
                    values,
                    editWorkorder,
                    uploadWorkorderphoto,
                    navigation,
                })
            }
            render={({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
            }) => (
                <ScrollView style={{ backgroundColor: '#f8f5f4' }}>
                    <View>
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                                placeholder="Work Order Title*"
                                style={wOForm.textInput}
                            />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleChange('detail')}
                                onBlur={handleBlur('detail')}
                                value={values.detail}
                                value={wo.detail}
                                style={wOForm.textInput1}
                                multiline={true}
                                placeholder="Detailed Description"
                            />
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 3 }}>
                            <Text sytle={wOForm.statusText}>
                                Tap to update status:
                            </Text>
                        </View>
                        <View style={wOForm.statusView}>
                            <View style={wOForm.statusDiv}>
                                <View style={wOForm.statusButton}>
                                    <Button
                                        onPress={() =>
                                            setFieldValue('status', 'Open')
                                        }
                                        buttonStyle={wOForm.statusButtons}
                                        titleStyle={wOForm.statusButtonsText}
                                        disabled={values.status === 'Open'}
                                        disabledStyle={
                                            wOForm.statusButtonsActive
                                        }
                                        disabledTitleStyle={
                                            wOForm.statusButtonsTextActive
                                        }
                                        icon={
                                            <Icon
                                                color="black"
                                                type="antdesign"
                                                name="unlock"
                                                size={20}
                                            />
                                        }
                                        title="Open"
                                    />
                                </View>
                                <Button
                                    onPress={() =>
                                        setFieldValue('status', 'Hold')
                                    }
                                    buttonStyle={wOForm.statusButtons}
                                    titleStyle={wOForm.statusButtonsText}
                                    disabled={values.status === 'Hold'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                    icon={
                                        <Icon
                                            color="black"
                                            type="antdesign"
                                            name="pause"
                                            size={20}
                                        />
                                    }
                                    title="Hold"
                                />
                                <Button
                                    onPress={() =>
                                        setFieldValue('status', 'Working')
                                    }
                                    buttonStyle={wOForm.statusButtons}
                                    titleStyle={wOForm.statusButtonsText}
                                    disabled={values.status === 'Working'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                    icon={
                                        <Icon
                                            color="black"
                                            type="antdesign"
                                            name="sync"
                                            size={20}
                                        />
                                    }
                                    title="Working"
                                />
                                <Button
                                    onPress={() =>
                                        setFieldValue('status', 'Done')
                                    }
                                    buttonStyle={wOForm.statusButtons}
                                    titleStyle={wOForm.statusButtonsText}
                                    disabled={values.status === 'Done'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                    icon={
                                        <Icon
                                            color="black"
                                            type="antdesign"
                                            name="lock"
                                            size={20}
                                        />
                                    }
                                    title="Done"
                                />
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text>Tap to update priority:</Text>
                        </View>
                        <View style={wOForm.statusView}>
                            <View style={wOForm.priorityDiv}>
                            <TouchableOpacity
                                style={[
                                    wOForm.priorityButtons,

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
                                {/* <Button
                                    onPress={() =>
                                        setFieldValue('priority', 'Low')
                                    }
                                    buttonStyle={wOForm.priorityButtons}
                                    title="Low"
                                    titleStyle={wOForm.priorityButtonsText}
                                    disabled={values.priority === 'Low'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                />
                                <Button */}
                                    onPress={() =>
                                        setFieldValue('priority', 'Medium')
                                    }
                                    buttonStyle={wOForm.priorityButtons}
                                    title="Medium"
                                    titleStyle={wOForm.priorityButtonsText}
                                    disabled={values.priority === 'Medium'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                />
                                <Button
                                    onPress={() =>
                                        setFieldValue('priority', 'High')
                                    }
                                    buttonStyle={wOForm.priorityButtons}
                                    title="High"
                                    titleStyle={wOForm.priorityButtonsText}
                                    disabled={values.priority === 'High'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                />
                                <Button
                                    onPress={() =>
                                        setFieldValue('priority', 'Urgent')
                                    }
                                    buttonStyle={wOForm.priorityButtons}
                                    title="Urgent"
                                    titleStyle={wOForm.priorityButtonsText}
                                    disabled={values.priority === 'Urgent'}
                                    disabledStyle={wOForm.statusButtonsActive}
                                    disabledTitleStyle={
                                        wOForm.statusButtonsTextActive
                                    }
                                />
                            </View>
                        </View>
                        <View style={wOForm.imgCard}>
                            <View style={wOForm.imgCardTop}>
                                <Text>Tap on image to upload.</Text>
                            </View>
                            <View style={wOForm.imgCardBot}>
                                {/* <TouchableOpacity
                                    style={wOForm.touchImage}
                                    onPress={() => PictureField}
                                > */}
                                    {values.photo.uri ? (
                                        <Image
                                            style={wOForm.imgUpload}
                                            source={{
                                                uri: values.photo.uri,
                                            }}
                                        />
                                    ) : values.workorderphoto ? (
                                        <Image
                                            style={wOForm.imgUpload}
                                            source={{
                                                uri: values.workorderphoto.path,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            style={wOForm.imgUpload}
                                            source={{
                                                uri: img1,
                                            }}
                                        />
                                    )}
                                {/* </TouchableOpacity> */}
                                    <Content padder>
                                        <Field
                                            style={wOForm.imgUpload}
                                            titleStyle={wOForm.statusButtonsTextActive}
                                            buttonStyle={wOForm.submitButton}
                                            name="photo"
                                        >
                                            {({ field, form }) => (
                                                <NativeButton
                                                    onPress={()=>
                                                        ActionSheet.show(
                                                            {
                                                                options: BUTTONS,
                                                                cancelButtonIndex: CANCEL_INDEX,
                                                                title: "Add an image"
                                                            },
                                                            buttonIndex => {
                                                                if (buttonIndex !== 2) {
                                                                    const find = async () => {
                                                                        const { status } = await Permissions.getAsync(buttonIndex === 0 ? Permissions.CAMERA_ROLL : Permissions.CAMERA);
                                                                        if (status !== "granted") {
                                                                            await Permissions.askAsync(buttonIndex === 0 ? Permissions.CAMERA_ROLL : Permissions.CAMERA);
                                                                        }
                                                                        const imageResult = (buttonIndex === 0 ? await ImagePicker.launchImageLibraryAsync({}) : await ImagePicker.launchCameraAsync({}));
                                                                        const fileName = imageResult.uri.split("/").pop();
                                                                        const match = /\.(\w+)$/.exec(fileName);
                                                                        const mimeType = match ? `image/${match[1]}` : `image`;
                                                                        if (!imageResult.cancelled) {
                                                                            const file = new ReactNativeFile({
                                                                                uri: imageResult.uri,
                                                                                type: imageResult.type,
                                                                                name: mimeType
                                                                            });
                                                                            setFieldValue('photo', file);
                                                                        }
                                                                    }
                                                                    find();
                                                                }
                                                            }
                                                        )}
                                                >
                                                    <Text>Choose a Photo</Text>
                                                </NativeButton>
                                            )}
                                        </Field>
                                    </Content>
                            </View>
                            {/* <View style={wOForm.imgCardBot}> */}
                                 {/* <Field
                                    name="photo"
                                    title="Photo from Camera"
                                    component={CameraField}
                                    style={wOForm.imgUpload}
                                    titleStyle={wOForm.statusButtonsTextActive}
                                    buttonStyle={wOForm.submitButton}
                                />
                            </View> */}
                      </View>
                        <View>
                            <Button
                                onPress={handleSubmit}
                                buttonStyle={wOForm.submitButton}
                                titleStyle={wOForm.statusButtonsTextActive}
                                title="Submit"
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        />
    )
}

export default EditWorkOrder
