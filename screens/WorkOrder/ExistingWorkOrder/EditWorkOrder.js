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
import { Button, Text } from "native-base";
import { Icon } from "react-native-elements";
import { wOForm, wOList, styles } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_WORKORDER = gql`
  query Workorder($id: ID) {
    workorder(id: $id) {
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

const EditWorkOrder = props => {
  const { data, loading, error } = useQuery(GET_WORKORDER, {
    // variables: { id: props.navigation.getParam("id", "no id") }
    variables: { id: props.navigation.state.params.id }
  });
  const { navigation } = props;
  const [wo, setWo] = useState(navigation.getParam("wo", "no wo"));
  const [photo, setPhoto] = useState(navigation.getParam("photo", "no wo"));
  const [photouri, setPhotouri] = useState(photo.uri);
  const [id, setId] = useState(props.navigation.state.params.id);
  const [clicked, setClicked] = useState();
  const [priority, setPriority] = useState(wo.priority);
  const [status, setStatus] = useState(wo.status);
  const [title, setTitle] = useState(wo.title);
  const [detail, setDetail] = useState(wo.detail);
  const [workorderphoto, setWorkorderphotos] = useState(wo.workorderphoto);

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "WorkOrderList" })]
  });
  const resetAction1 = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "EditWorkOrder" })]
  });
  const handleSubmit = () => {
    return null;
  };
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Creating New Work Order</Text>
      </SafeAreaView>
    );
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Error</Text>
      </SafeAreaView>
    );
  }
  // SET PLACEHOLDER IMAGES TO STATE 10/24/2019 SD
  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";
  return (
    <ScrollView style={{ backgroundColor: "#f8f5f4" }}>
      <View>
        <View style={{ marginTop: 15 }}>
          <TextInput
            placeholder="Work Order Title*"
            onChangeText={setTitle}
            value={title}
            style={wOForm.textInput}
          />
        </View>
        <View>
          <TextInput
            placeholder="Detailed Description"
            onChangeText={setDetail}
            value={detail}
            style={wOForm.textInput1}
          />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Text>Tap to update status:</Text>
        </View>
        <View style={wOForm.statusDiv}>
          <TouchableOpacity
            onPress={() => setStatus("Not Started")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="unlock" />
            <Text style={wOForm.statusButtonsText}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("In Progress")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="sync" />
            <Text style={wOForm.statusButtonsText}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("Complete")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="lock" />
            <Text style={wOForm.statusButtonsText}>Complete</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Text>Tap to update priority:</Text>
        </View>
        <View style={wOForm.priorityDiv}>
          <TouchableOpacity
            onPress={() => setPriority("Low")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("Medium")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("High")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>High</Text>
          </TouchableOpacity>
        </View>
        <View style={wOForm.imgCard}>
          <View style={wOForm.imgCardTop}>
            <Text>Tap on image to upload.</Text>
          </View>
          <View style={wOForm.imgCardBot}>
            <TouchableOpacity
              style={wOForm.touchImage}
              onPress={() =>
                props.navigation.navigate("CameraModule", {
                  from: "EditWorkOrder",
                  id: id
                })}
            >
              {photo
                ? <Image
                    style={wOForm.imgUpload}
                    source={{
                      uri: photouri
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
    </ScrollView>
  );
};

export default EditWorkOrder;
