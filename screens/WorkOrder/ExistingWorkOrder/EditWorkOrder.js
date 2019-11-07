import React, { useState, useEffect, useContext } from "react";
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
  ActivityIndicator
} from "react-native";
import { Field, Formik } from "formik";
import { Text } from "native-base";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import { wOForm, wOList, styles } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const EditWorkOrder = ({ navigation }) => {
  const {
    id,
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

  //const [photo, setPhoto] = useState(navigation.getParam("photo", "no wo"));
  //const [photouri, setPhotouri] = useState(photo.uri);

  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

  return (
    <Formik
      initialValues={{
        detail: detail,
        priority: priority,
        status: status,
        title: title,
        workorderphoto: workorderphoto
      }}
      onSubmit={values => console.log(values)}
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
              />
            </View>
            <View style={{ backgroundColor: "white", padding: 3 }}>
              <Text sytle={wOForm.statusText}>Tap to update status:</Text>
            </View>
            <View style={wOForm.statusView}>
              <View style={wOForm.statusDiv}>
                <Button
                  onPress={() => setFieldValue("status", "Not Started")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "Not Started"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                  icon={
                    <Icon
                      color="black"
                      type="antdesign"
                      name="unlock"
                      size={35}
                    />
                  }
                  title="Not Started"
                />
                <Button
                  onPress={() => setFieldValue("status", "In Progress")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "In Progress"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                  icon={
                    <Icon
                      color="black"
                      type="antdesign"
                      name="sync"
                      size={35}
                    />
                  }
                  title="In Progress"
                />
                <Button
                  onPress={() => setFieldValue("status", "Complete")}
                  buttonStyle={wOForm.statusButtons}
                  titleStyle={wOForm.statusButtonsText}
                  disabled={values.status === "Complete"}
                  disabledStyle={wOForm.statusButtonsActive}
                  disabledTitleStyle={wOForm.statusButtonsTextActive}
                  icon={
                    <Icon
                      color="black"
                      type="antdesign"
                      name="lock"
                      size={35}
                    />
                  }
                  title="Complete"
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
              </View>
            </View>
            <View style={wOForm.imgCard}>
              <View style={wOForm.imgCardTop}>
                <Text>Tap on image to upload.</Text>
              </View>
              <View style={wOForm.imgCardBot}>
                <TouchableOpacity
                  style={wOForm.touchImage}
                  // onPress={() =>
                  //   navigation.navigate("CameraModule", {
                  //     from: "EditWorkOrder",
                  //     id: id
                  //   })}
                >
                  {workorderphoto && workorderphoto.path
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
                </TouchableOpacity>
              </View>
            </View>

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
        </ScrollView>}
    />
  );
};

export default EditWorkOrder;
