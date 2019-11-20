import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Platform
} from "react-native";
import { Field, Formik } from "formik";
import { ActionSheet, Content, Button as NativeButton } from "native-base";
import { Icon, Button } from "react-native-elements";
import { wOForm } from "../../../assets/style";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import * as Permissions from "expo-permissions";
import { font, color } from "../../../assets/style/base";
import { styles } from "../../../assets/style";

const WORKORDER_EDIT = gql`
  mutation WorkorderEdit($workorder: WorkorderInput!) {
    workorderEdit(workorder: $workorder) {
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
`;

const handleSubmit = ({
  values,
  workorderEdit,
  navigation,
  setErrors,
  setSubmitting
}) => {
  const { id, qrcode, detail, priority, status, title, photo } = values;
  workorderEdit({
    variables: {
      workorder: {
        id: id,
        qrcode: qrcode,
        detail: detail,
        priority: priority,
        status: status,
        title: title,
        photo: photo
      }
    }
  })
    .then(response => {
      console.log("response", response)
      const { workorderEdit } = response;
      // navigation.navigate("WorkOrderListView");
      navigation.goBack();
    })
    .catch(e => {
      console.log("error", e)
      const errors = e.graphQLErrors.map(error => {
        alert(error.message);
        setErrors({ form: error.message });
        setSubmitting(false);
      });
    });
};

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
    workorderphoto
  } = navigation.state.params;

  const [workorderEdit, { error, loading }] = useMutation(
    WORKORDER_EDIT,
    {
      // onCompleted({ workorderEdit }) {
      //   refetch();
      // }
    }
  );

  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";
  const BUTTONS = [
    { text: "Gallery" },
    { text: "Take Photo" },
    { text: "Cancel" }
  ];
  const CANCEL_INDEX = 2;
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Loading</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error </Text>
      </SafeAreaView>
    );
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
        photo: null
      }}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        handleSubmit({
          values,
          workorderEdit,
          navigation,
          setErrors,
          setSubmitting
        });
      }}
      render={({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        isSubmitting
      }) =>
        <ScrollView style={{ backgroundColor: "#f8f5f4" }}>
          <View style={{ backgroundColor: "white" }}>
            <View style={{ marginTop: 15 }}>
              <TextInput
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Work Order Title*"
                style={wOForm.textInput}
              />
            </View>
            <View>
              <TextInput
                onChangeText={handleChange("detail")}
                onBlur={handleBlur("detail")}
                value={values.detail}
                style={wOForm.textInput1}
                multiline={true}
                placeholder="Detailed Description"
              />
            </View>
            <View style={wOForm.psContainer}>
              <View style={wOForm.updateButtonContainer}>
                <Text style={wOForm.updateButtonText}>
                  Tap to update status:
                </Text>
                <View style={wOForm.statusView}>
                  <View style={wOForm.statusButton}>
                    <Button
                      onPress={() => setFieldValue("status", "Open")}
                      buttonStyle={wOForm.statusButtons}
                      titleStyle={wOForm.statusButtonsText}
                      disabled={values.status === "Open"}
                      disabledStyle={wOForm.statusButtonsActive}
                      disabledTitleStyle={wOForm.statusButtonsTextActive}
                      icon={
                        <Icon
                          color={values.status === "Open" ? "white" : "#89898E"}
                          type="antdesign"
                          name="unlock"
                          size={20}
                        />
                      }
                      title="Open"
                    />
                  </View>
                  <Button
                    onPress={() => setFieldValue("status", "Hold")}
                    buttonStyle={wOForm.statusButtons}
                    titleStyle={wOForm.statusButtonsText}
                    disabled={values.status === "Hold"}
                    disabledStyle={wOForm.statusButtonsActive}
                    disabledTitleStyle={wOForm.statusButtonsTextActive}
                    icon={
                      <Icon
                        color={values.status === "Hold" ? "white" : "#89898E"}
                        type="antdesign"
                        name="pause"
                        size={20}
                      />
                    }
                    title="Hold"
                  />
                  <Button
                    onPress={() => setFieldValue("status", "Working")}
                    buttonStyle={wOForm.statusButtons}
                    titleStyle={wOForm.statusButtonsText}
                    disabled={values.status === "Working"}
                    disabledStyle={wOForm.statusButtonsActive}
                    disabledTitleStyle={wOForm.statusButtonsTextActive}
                    icon={
                      <Icon
                        color={
                          values.status === "Working" ? "white" : "#89898E"
                        }
                        type="antdesign"
                        name="sync"
                        size={20}
                      />
                    }
                    title="Working"
                  />
                  <Button
                    onPress={() => setFieldValue("status", "Done")}
                    buttonStyle={wOForm.statusButtons}
                    titleStyle={wOForm.statusButtonsText}
                    disabled={values.status === "Done"}
                    disabledStyle={wOForm.statusButtonsActive}
                    disabledTitleStyle={wOForm.statusButtonsTextActive}
                    icon={
                      <Icon
                        color={values.status === "Done" ? "white" : "#89898E"}
                        type="antdesign"
                        name="lock"
                        size={20}
                      />
                    }
                    title="Done"
                  />
                </View>
              </View>
              <View style={wOForm.updateButtonContainer}>
                <Text style={wOForm.updateButtonText}>
                  Tap to update priority:
                </Text>
                <View style={wOForm.statusView}>
                  <View style={wOForm.priorityDiv}>
                    <Button
                      onPress={() => setFieldValue("priority", "Low")}
                      buttonStyle={wOForm.priorityButtons}
                      title="Low"
                      titleStyle={wOForm.priorityButtonsText}
                      disabled={values.priority === "Low"}
                      disabledStyle={{ backgroundColor: color.accLow }}
                      disabledTitleStyle={{
                        fontFamily: font.reg,
                        color: color.priLow
                      }}
                    />
                    <Button
                      onPress={() => setFieldValue("priority", "Medium")}
                      buttonStyle={wOForm.priorityButtons}
                      title="Medium"
                      titleStyle={wOForm.priorityButtonsText}
                      disabled={values.priority === "Medium"}
                      disabledStyle={{ backgroundColor: color.accMed }}
                      disabledTitleStyle={{
                        fontFamily: font.reg,
                        color: color.priMed
                      }}
                    />
                    <Button
                      onPress={() => setFieldValue("priority", "High")}
                      buttonStyle={wOForm.priorityButtons}
                      title="High"
                      titleStyle={wOForm.priorityButtonsText}
                      disabled={values.priority === "High"}
                      disabledStyle={{ backgroundColor: color.accHigh }}
                      disabledTitleStyle={{
                        fontFamily: font.reg,
                        color: color.priHigh
                      }}
                    />
                    <Button
                      onPress={() => setFieldValue("priority", "Urgent")}
                      buttonStyle={wOForm.priorityButtons}
                      title="Urgent"
                      titleStyle={wOForm.priorityButtonsText}
                      disabled={values.priority === "Urgent"}
                      disabledStyle={{ backgroundColor: color.accUrg }}
                      disabledTitleStyle={{
                        fontFamily: font.reg,
                        color: color.priUrg
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={wOForm.imgCard}>
              <View style={wOForm.imgCardBot}>
                {values.photo
                  ? <View style={wOForm.imgContainer}>
                      <Image
                        style={wOForm.imgUpload}
                        source={{
                          uri: values.photo.uri
                        }}
                      />
                    </View>
                  : values.workorderphoto
                    ? <View style={wOForm.imgContainer}>
                        <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: values.workorderphoto.path
                          }}
                        />
                      </View>
                    : null}
                {/* </TouchableOpacity> */}
                <Content>
                  <Field
                    style={wOForm.imgUpload}
                    titleStyle={wOForm.statusButtonsTextActive}
                    buttonStyle={wOForm.submitButton}
                    name="photo"
                  >
                    {({ field, form }) =>
                      <NativeButton
                        style={wOForm.photoHandlerButton}
                        onPress={() =>
                          ActionSheet.show(
                            {
                              options: BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              title: "Add an image"
                            },
                            buttonIndex => {
                              if (buttonIndex !== 2) {
                                const find = async () => {
                                  const { status } = await Permissions.getAsync(
                                    buttonIndex === 0
                                      ? Permissions.CAMERA_ROLL
                                      : Permissions.CAMERA
                                  );
                                  console.log(status);
                                  if (status !== "granted") {
                                    await Permissions.askAsync(
                                      buttonIndex === 0
                                        ? Permissions.CAMERA_ROLL
                                        : Permissions.CAMERA
                                    );
                                  }
                                  console.log("here");
                                  const imageResult = await (buttonIndex === 0
                                    ? ImagePicker.launchImageLibraryAsync({})
                                    : ImagePicker.launchCameraAsync({}));
                                  console.log(imageResult);
                                  const fileName = imageResult.uri
                                    .split("/")
                                    .pop();
                                  const match = /\.(\w+)$/.exec(fileName);
                                  const mimeType = match
                                    ? `image/${match[1]}`
                                    : "image";
                                  if (!imageResult.cancelled) {
                                    const file = new ReactNativeFile({
                                      uri: imageResult.uri,
                                      type:
                                        imageResult.type +
                                        (Platform.OS === "ios" ? "" : "/jpeg"),
                                      name: "image"
                                    });
                                    console.log(file);
                                    setFieldValue("photo", file);
                                  }
                                };
                                find();
                              }
                            }
                          )}
                      >
                        <Text
                          style={[
                            wOForm.photoHandlerText,
                            { marginBottom: -12 }
                          ]}
                        >
                          Add Image
                        </Text>
                      </NativeButton>}
                  </Field>
                </Content>
              </View>
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
        </ScrollView>}
    />
  );
};

export default EditWorkOrder;
