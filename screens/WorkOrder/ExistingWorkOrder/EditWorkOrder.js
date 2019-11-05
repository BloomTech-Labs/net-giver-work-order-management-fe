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
  TouchableOpacity
} from "react-native";
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
  Text
} from "native-base";
import { wOForm } from "../../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
// import {token} from '../../../token'
const EditWorkOrder = props => {
  const { navigation } = props;
  const [wo, setWo] = useState(navigation.getParam("wo", "no wo"));
  const [clicked, setClicked] = useState();
  const [priority, setPriority] = useState(wo.priority);
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
    actions: [NavigationActions.navigate({ routeName: "EditWorkOrder" })]
  });
  const handleSubmit = () => {
    return null;
  };

  // SET PLACEHOLDER IMAGES TO STATE 10/24/2019 SD
  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

  const img2 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";
  const img3 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

  //SET CLICKED TO STATE FOR ACTIONsHEET (CAMERA FUNCTIONS) 10/24/2019 SD

  //SET BUTTONS AND CANCEL_INDEX FOR ACTIONSHEET 12/24/2019 SD
  const BUTTONS = [
    { text: "Take Picture with Camera" },
    { text: "Use Existing Photo" },
    { text: "Cancel" }
  ];
  const CANCEL_INDEX = 2;
  //SET QR CODE FROM PROPS 10/24/2019 SD

  return (
    <ScrollView>
      <View>
        <View style={{ marginTop: 15 }}>
          <TextInput
            placeholder="What is broken?"
            name="title"
            value={title}
            onChangeText={setTitle}
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
                onPress={() => setPriority("N/A")}
              >
                <Text>N/A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={wOForm.pBarButton}
                onPress={() => setPriority("Low")}
              >
                <Text>Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={wOForm.pBarButton}
                onPress={() => setPriority("Medium")}
              >
                <Text>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={wOForm.pBarButton}
                onPress={() => setPriority("High")}
              >
                <Text>High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={wOForm.pBarButton}
                onPress={() => setPriority("Emergency")}
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
              onPress={() => setStatus("Not Started")}
            >
              <Text>Not Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={wOForm.pBarButton}
              onPress={() => setStatus("In Progress")}
            >
              <Text>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={wOForm.pBarButton}
              onPress={() => setStatus("Complete")}
            >
              <Text>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text>Work Order Images (Long Press to Delete)</Text>
        <View style={wOForm.imageBox}>
          <View style={wOForm.image}>
            {/* TURN IMAGE INTO BUTTON WITH LONGPRESS THAT WILL DELETE THE PHOTO
                            DELETE NEEDS FUNCTIONALITY 12/24/2019 SD */}
            <TouchableOpacity onLongPress={() => handlePhotoDelete()}>
              {workorderphotos[0]
                ? <Image
                    style={wOForm.placeholder}
                    source={{ uri: workorderphotos[0].path }}
                  />
                : <Image
                    style={wOForm.placeholder}
                    source={{
                      uri: img1
                    }}
                  />}
            </TouchableOpacity>
          </View>
          <View style={wOForm.image}>
            <TouchableOpacity onLongPress={() => handlePhotoDelete()}>
              {workorderphotos[1]
                ? <Image
                    style={wOForm.placeholder}
                    source={{ uri: workorderphotos[1].path }}
                  />
                : <Image
                    style={wOForm.placeholder}
                    source={{
                      uri: img1
                    }}
                  />}
            </TouchableOpacity>
          </View>
          <View style={wOForm.image}>
            <TouchableOpacity onLongPress={() => handlePhotoDelete()}>
              {workorderphotos[2]
                ? <Image
                    style={wOForm.placeholder}
                    source={{ uri: workorderphotos[2].path }}
                  />
                : <Image
                    style={wOForm.placeholder}
                    source={{
                      uri: img1
                    }}
                  />}
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
                  title: "Choose a Photo"
                },
                buttonIndex => {
                  setClicked(BUTTONS[buttonIndex]);
                }
              )}
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
  );
};

export default EditWorkOrder;
