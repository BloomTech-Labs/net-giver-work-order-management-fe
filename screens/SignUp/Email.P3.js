import React, { useState } from "react"
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    View,
    Image,
    TextInput,
} from "react-native"
import * as Yup from "yup"
import { Field, Formik } from "formik"
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { wOList, styles } from "../../assets/style"
import { su1, su2, su3 } from "./SignUpStyles"
import ErrorMessage from "./ErrorMessage"
import * as ImagePicker from "expo-image-picker"
import { ReactNativeFile } from "apollo-upload-client"
import * as Permissions from "expo-permissions"
import {
    Text as NativeText,
    ActionSheet,
    Content,
    Button as NativeButton,
    Container,
    Toast,
} from "native-base"
import { USER } from "../../common/queries"
import { topBtn } from "../../assets/style/components/buttons"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"
import { color, font, marpad, cnt, mar } from "../../assets/style/base"

const USER_EDIT = gql`
    mutation editUser($userInfo: UserInput!) {
        editUser(userInfo: $userInfo) {
            id
            phone
            authyId
            email
            username
            photo {
                path
            }
        }
    }
`

const handleSubmit = ({
    values,
    editUser,
    navigation,
    setSubmitting,
    setErrors,
}) => {
    const { username, photo, newphoto } = values
    editUser({
        variables: { userInfo: { username: username, photo: newphoto } },
    })
        .then(response => {
            const { editUser } = response.data
            navigation.navigate("WorkOrderList", { ...editUser })
        })
        .then(response => {
            const { editUser } = response.data
            navigation.navigate("WorkOrderList", { ...editUser })
        })
        .catch(e => {
            const errors = e.graphQLErrors.map(error => {
                setErrors({ form: error.message })
            })
        })
}

const Email = ({ navigation }) => {
    const { data, loading, error } = useQuery(USER, {
        fetchPolicy: "no-cache",
    })

    const placeholderImg =
        "http://placehold.jp/006e13/ffffff/200x200.png?text=Click%20to%20Add%20an%20Image"
    const BUTTONS = [
        { text: "Gallery" },
        { text: "Take Photo" },
        { text: "Cancel" },
    ]
    const CANCEL_INDEX = 2

    const [editUser, { error: mutationerror }] = useMutation(USER_EDIT, {})

    if (loading)
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="black" />
                <Text>Loading</Text>
            </SafeAreaView>
        )
    if (error)
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error</Text>
            </SafeAreaView>
        )
    return (
        <Formik
            initialValues={{
                id: data.currentUser.id,
                phone: data.currentUser.phone,
                email: data.currentUser.email,
                authyId: data.currentUser.authyId,
                username: data.currentUser.username || "",
                photo: data.currentUser.photo,
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .min(2, "Min 2")
                    .max(30, "Max 30")
                    .required("Username Required"),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) =>
                handleSubmit({
                    editUser,
                    navigation,
                    values,
                    setSubmitting,
                    setErrors,
                })
            }
            render={({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
                setFieldValue,
                status,
                isSubmitting,
                toCamera,
            }) => (
                <SafeAreaView style={cnt.cnt}>
                    <Text style={su3.header}>Edit Your Profile</Text>
                    <Text style={su3.subHead}>
                        So your colleagues can recognize you!
                    </Text>
                    {/* <Content padder> */}
                    <Field
                        style={su3.avatar}
                        titleStyle={su3.subHead}
                        //   buttonStyle={wOForm.submitButton}
                        name="photo"
                    >
                        {({ field, form }) => (
                            <TouchableOpacity
                                style={su3.avatar}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: BUTTONS,
                                            cancelButtonIndex: CANCEL_INDEX,
                                            title: "Add an image",
                                        },
                                        buttonIndex => {
                                            if (buttonIndex !== 2) {
                                                const find = async () => {
                                                    const {
                                                        status,
                                                    } = await Permissions.getAsync(
                                                        buttonIndex === 0
                                                            ? Permissions.CAMERA_ROLL
                                                            : Permissions.CAMERA
                                                    )
                                                    if (status !== "granted") {
                                                        await Permissions.askAsync(
                                                            buttonIndex === 0
                                                                ? Permissions.CAMERA_ROLL
                                                                : Permissions.CAMERA
                                                        )
                                                    }
                                                    const imageResult =
                                                        buttonIndex === 0
                                                            ? await ImagePicker.launchImageLibraryAsync(
                                                                  {}
                                                              )
                                                            : await ImagePicker.launchCameraAsync(
                                                                  {}
                                                              )
                                                    const fileName = imageResult.uri
                                                        .split("/")
                                                        .pop()
                                                    const match = /\.(\w+)$/.exec(
                                                        fileName
                                                    )
                                                    const mimeType = match
                                                        ? `image/${match[1]}`
                                                        : `image`
                                                    if (
                                                        !imageResult.cancelled
                                                    ) {
                                                        const file = new ReactNativeFile(
                                                            {
                                                                uri:
                                                                    imageResult.uri,
                                                                type:
                                                                    imageResult.type,
                                                                name: mimeType,
                                                            }
                                                        )
                                                        setFieldValue(
                                                            "photo",
                                                            file
                                                        )
                                                    }
                                                }
                                                find()
                                            }
                                        }
                                    )
                                }
                            >
                                {values.photo ? (
                                    <Image
                                        style={su3.image}
                                        source={{
                                            uri:
                                                values.photo.uri ||
                                                values.photo.path,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={su3.image}
                                        source={{
                                            uri: placeholderImg,
                                        }}
                                    />
                                )}
                                <Text style={su3.avatarText}>
                                    Profile Photo
                                </Text>
                            </TouchableOpacity>
                        )}
                    </Field>
                    {/* </Content> */}
                    <View style={mar.marSmBt} />

                    <TextInput
                        style={txtInput.fullWidthInputMarginBottom}
                        placeholder="username"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                    />
                    <View style={mar.marMdLtMdTp}>
                        <Text>This is your email: {values.email}</Text>
                    </View>
                    <View style={mar.marMdBt} />
                    <TouchableOpacity
                        style={topBtn.fullWidthBtnMargin}
                        onPress={handleSubmit}
                    >
                        <Text style={topBtn.btnFont}>Submit</Text>
                    </TouchableOpacity>
                    <ErrorMessage errorValue={errors.form} />
                    <View style={mar.marMdLtRtBt}>
                        <Text style={su3.tosFont}>
                            By pressing "Submit" above, you agree to our{" "}
                            <Text
                                onPress={() => navigation.navigate("TOS")}
                                style={su3.underline}
                            >
                                terms of service{" "}
                            </Text>
                            and{" "}
                            <Text
                                style={su3.underline}
                                onPress={() => navigation.navigate("PP")}
                            >
                                privacy policy.
                            </Text>
                        </Text>
                    </View>
                    <Text
                        onPress={() => navigation.navigate("Contact")}
                        style={su3.subHead}
                    >
                        Contact the Net Giver Team
                    </Text>
                </SafeAreaView>
            )}
        />
    )
}

export default Email
