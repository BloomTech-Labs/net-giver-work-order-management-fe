import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Field, Formik } from "formik";
import { Text } from "native-base";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import {  wOList, styles } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PictureField } from "../../../components/shared/PictureField";
import { CameraField } from "../../../components/shared/CameraField";

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
`;

const WO_PIC = gql`
  mutation uploadWorkorderphoto($photo: Upload!, $workorderId: ID!) {
    uploadWorkorderphoto(photo: $photo, workorderId: $workorderId) {
      userId
      filename
      path
    }
  }
`;

const updateWo = async ({
  values,
  editWorkorder,
  uploadWorkorderphoto,
  navigation
}) => {
  if (values.photo.uri) {
    console.log(values.photo);
    const picresult = await uploadWorkorderphoto({
      variables: {
        photo: values.photo,
        workorderId: values.id
      }
    });
    const editresult = await editWorkorder({
      variables: {
        id: values.id,
        qrcode: values.qrcode,
        detail: values.detail,
        priority: values.priority,
        status: values.status,
        title: values.title
      }
    });
    navigation.goBack();
  }
  const editresult = await editWorkorder({
    variables: {
      id: values.id,
      qrcode: values.qrcode,
      detail: values.detail,
      priority: values.priority,
      status: values.status,
      title: values.title
    }
  });

  // if (get(editresult, "data.workorder")) {
  //   // navigation.goBack();
  //   null;
  // }

  navigation.goBack();
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

  const [wo, setWo] = useState({
    id: id,
    detail: detail
  });
  const [editWorkorder, { loading, error }] = useMutation(EDIT_WO, {});

  const [uploadWorkorderphoto, { picloading, picerror }] = useMutation(
    WO_PIC,
    {}
  );
  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

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
        photo: {}
      }}
      onSubmit={async values =>
        updateWo({
          values,
          editWorkorder,
          uploadWorkorderphoto,
          navigation
        })}
      render={({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue
      }) =>
        <ScrollView style={{ backgroundColor: "#f8f5f4" }}>
          <View>
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
                value={wo.detail}
                style={wOForm.textInput1}
                multiline={true}
                placeholder='Detailed Description'
              />
            </View>
            <View style={{ backgroundColor: "white", padding: 3 }}>
              <Text sytle={wOForm.statusText}>Tap to update status:</Text>
            </View>
            <View style={wOForm.statusView}>
              <View style={wOForm.statusDiv}>
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
                  onPress={() => setFieldValue("status", "Hold")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "Hold"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
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
                  onPress={() => setFieldValue("status", "Working")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "Working"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
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
                  onPress={() => setFieldValue("status", "Done")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "Done"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
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
            <View style={{ backgroundColor: "white" }}>
              <Text>Tap to update priority:</Text>
            </View>
            <View style={wOForm.statusView}>
              <View style={wOForm.priorityDiv}>
                <Button
                  onPress={() => setFieldValue("priority", "Low")}
                  buttonStyle={wOForm.priorityButtons}
                  title="Low"
                  titleStyle={wOForm.priorityButtonsText}
                  disabled={values.priority === "Low"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                />
                <Button
                  onPress={() => setFieldValue("priority", "Medium")}
                  buttonStyle={wOForm.priorityButtons}
                  title="Medium"
                  titleStyle={wOForm.priorityButtonsText}
                  disabled={values.priority === "Medium"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                />
                <Button
                  onPress={() => setFieldValue("priority", "High")}
                  buttonStyle={wOForm.priorityButtons}
                  title="High"
                  titleStyle={wOForm.priorityButtonsText}
                  disabled={values.priority === "High"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                />
                                <Button
                  onPress={() => setFieldValue("priority", "Urgent")}
                  buttonStyle={wOForm.priorityButtons}
                  title="Urgent"
                  titleStyle={wOForm.priorityButtonsText}
                  disabled={values.priority === "Urgent"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                />
              </View>
            </View>
            <View style={wOForm.imgCard}>
              <View style={wOForm.imgCardTop}>
                <Text>Tap on image to upload.</Text>
              </View>
              <View style={wOForm.imgCardBot}>
                <TouchableOpacity style={wOForm.touchImage} onPress={()=> PictureField}>
                  {values.photo.uri
                    ? <Image
                        style={wOForm.imgUpload}
                        source={{
                          uri: values.photo.uri
                        }}
                      />
                    : values.workorderphoto
                      ? <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: values.workorderphoto.path
                          }}
                        />
                      : <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: img1
                          }}
                        />}
                  <Field
                    name="photo"
                    title="pick a picture"
                    component={PictureField}
                    style={wOForm.imgUpload}
                  />
                </TouchableOpacity>
              </View>
              <View style={wOForm.imgCardBot}>
                <TouchableOpacity style={wOForm.touchImage}>
                  {values.photo.uri
                    ? <Image
                        style={wOForm.imgUpload}
                        source={{
                          uri: values.photo.uri
                        }}
                      />
                    : values.workorderphoto
                      ? <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: values.workorderphoto.path
                          }}
                        />
                      : <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: img1
                          }}
                        />}
                  <Field
                    name="photo"
                    title="take a picture"
                    component={CameraField}
                    style={wOForm.imgUpload}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Button
                type="outline"
                onPress={handleSubmit}
                color="white"
                title="Submit"
                raised={true}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </ScrollView>}
    />
  );
};

export default EditWorkOrder;
const wOForm = StyleSheet.create({
  imgCard: {
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    marginBottom: 5
  },
  imgCardTop: {},
  imgCardBot: {},
  imgCardBot: {},
  touchImage: {},
  imgUpload: {
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto"
  },
  statusView: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "flex-start",
    justifyContent: "space-between",
    padding: 0,
    borderWidth: 0,
    // borderBottomWidth: 1,
    alignItems: "center",
    padding: 5
  },
  statusText: {
    textAlign: "left",
    width: "100%"
  },
  statusDiv: {
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    justifyContent:"space-between",
    borderWidth: 0,
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginTop: 0,
    borderRadius: 0
  },
  statusButton: {flexDirection:'column'},
  statusButtons: {
    backgroundColor: "#f4f3f3",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    margin: 3,
    flexDirection:'column',
    width: 80,
  },
  statusButtonsText: { color: "#89898E", textAlign: "center", fontSize: 14 },
  statusButtonsActive: {
    backgroundColor: "#009900"
  },
  statusButtonsTextActive: {
    color: "white"
  },
  priorityDiv: {
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    borderWidth: 0,
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginTop: 0,
    borderRadius: 0,
    justifyContent:'space-between'
  },
  priorityButtons: {
    backgroundColor: "#f4f3f3",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    margin: 3,
    height: 55,
    width: 80
  },
  priorityButtonsText: {
    color: "#89898E",
    textAlign: "center",
    fontSize: 14,
    marginTop: "auto",
    marginBottom: "auto"
  },

  priorityButtonsActive: {
    backgroundColor: "#009900",
    width: "23%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    padding: 5,
    height: 53
  },
  priorityButtonsTextActive: {
    color: "white",
    textAlign: "center",
    fontSize: 14
  },
  hidden: {
    display: "none",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#006E13",
    borderWidth: 2,
    borderColor: "#EDF1F3",
    width: "96%",
    alignSelf: "center",
    justifyContent: "center"
  },
  textInput: {
    marginTop: -15,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#ffffff",
    borderColor: "#C5C2C2",
    width: "102%",
    alignSelf: "center",
    padding: 10
  },
  textInput1: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#ffffff",
    borderColor: "#C5C2C2",
    width: "102%",
    alignSelf: "center",
    padding: 10,
    height: 90,
    textAlignVertical: "top",
  }
});