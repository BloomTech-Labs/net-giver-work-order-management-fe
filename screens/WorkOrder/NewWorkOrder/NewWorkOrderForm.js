import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Button, Text } from "native-base";
import { Icon } from "react-native-elements";
import axios from "axios";
import { wOForm } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { wOList } from "../../../components/Styles";
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
    editWorkOrder(
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
    //navigation.getParam("photo", "no photo")
  );
  const [workorderphoto, setWorkorderphoto] = useState(photo.uri);
  const [clicked, setClicked] = useState();
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState(wo.status);
  const [title, setTitle] = useState(wo.title);
  const [detail, setDetail] = useState(wo.detail);
  const [workorderphotos, setWorkorderphotos] = useState(wo.workorderphotos);

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "WorkOrderList" })]
  });
  const resetAction1 = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "BarCodeScanner" })]
  });
  console.log("TCL: props", props);
  // SET PLACEHOLDER IMAGES TO STATE 10/24/2019 SD

  // useEffect(() => {
  //   setPhoto(
  //     props.navigation.getParam(
  //       "photo",
  //       null
  //     )
  //   );
  // }, []);

  //SET QR CODE FROM PROPS 10/24/2019 SD
  const { qrcode } = 12345555;

  // props.navigation.state.params.qrcode
  const { workOrderId } = 1;
  console.log("TCL: qrcode", qrcode);
  //SUBMIT HANDLER 10/24/2019 SD
  const [editWorkOrder, { data, loading, error }] = useMutation(
    EDIT_WORK_ORDER
  );
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
            onPress={() => setStatus("1 Open")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="unlock" />
            <Text style={wOForm.statusButtonsText}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("2 OnHold")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="pause" />
            <Text style={wOForm.statusButtonsText}>On Hold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("3 InProgress")}
            style={wOForm.statusButtons}
          >
            <Icon color="#009900" type="antdesign" name="sync" />
            <Text style={wOForm.statusButtonsText}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("4 Complete")}
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
            onPress={() => setPriority("1 None")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>None</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("2 Low")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("3 Medium")}
            style={wOForm.priorityButtons}
          >
            <Text style={wOForm.priorityButtonsText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("4 High")}
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
                props.navigation.navigate("Camera", {
                  from: "NewWorkOrder"
                })}
            >
              <Image
                style={wOForm.imgUpload}
                source={{
                  uri: photo.uri
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

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
      {/* </View> */}
    </ScrollView>
  );
};
export default NewWorkOrderForm;
