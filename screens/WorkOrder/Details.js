import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Alert,
  Image,
  SafeAreaView,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Field, Formik } from "formik";
import { Text } from "native-base";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import { wOList, styles } from "../../assets/style";
import { color } from "../../assets/style/base";
import { StackActions, NavigationActions } from "react-navigation";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PictureField } from "../../components/shared/PictureField";
import { CameraField } from "../../components/shared/CameraField";
import EditWorkOrder from "./ExistingWorkOrder/EditWorkOrder";

const GET_WORKORDER = gql`
  query workorder($id: ID!) {
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

const Details = ({ navigation }) => {
  const {
    id
    // qrcode,
    // detail,
    // priority,
    // status,
    // title,
    // user,
    // user: { username },
    // workorderphoto,
    // createdAt
  } = navigation.state.params;

  const { data, loading, error } = useQuery(GET_WORKORDER, {
    variables: { id }
  });

  var createdAt = "2018/3/12";
  const [onPressDetails, setOnPressDetails] = useState();
  const [onPressUpdates, setOnPressUpdats] = useState();
  const [sentFrom, setSentFrom] = useState();

  const initialState = {
    id: id,
    detail: null,
    createdAt: null,
    qrcode: null,
    priority: null,
    status: null,
    title: null,
    user: {},
    workorderphoto: {}
  };
  // const [workorder, setWorkorder] = useState({});

  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

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
        <Text>Error</Text>
      </SafeAreaView>
    );
  if (data && data.workorder) {
    // setWorkorder(data.workorder);
    const workorder = data.workorder || null;
  }

  // const mutatedData = React.useMemo(() => {
  //   // if you want to mutate the data for some reason
  //   return data
  // }, [data])
  return (
    <ScrollView>
      {/* NAV CONTAINER*/}

      {/* IMAGE */}
      <View style={details.imgDiv}>
        {data.workorder.workorderphoto
          ? <Image
              style={wOForm.imgUpload}
              source={{
                uri: data.workorder.workorderphoto.uri
                  ? data.workorder.workorderphoto.uri
                  : data.workorder.workorderphoto.path
              }}
            />
          : <Image
              style={wOForm.imgUpload}
              source={{
                uri: img1
              }}
            />}
      </View>

      <View style={[details.theDetsContainer, { backgroundColor: "#F8F5F4" }]}>
        <View style={details.topDetailsDiv}>
          {/* TITLE */}
          <View style={details.titlePriorityDiv}>
            <Text style={details.wOTitle}>
              {data.workorder.title}
            </Text>

            {/* PRIORITY BOXES */}
            <View
              style={[
                {
                  backgroundColor:
                    data.workorder.priority === "Low"
                      ? color.accLow
                      : data.workorder.priority === "Medium"
                        ? color.accMed
                        : data.workorder.priority === "High"
                          ? color.accHigh
                          : color.accUrg
                },
                details.infoBackground
              ]}
            >
              <Text
                style={[
                  { fontWeight: "500" },
                  {
                    color:
                      data.workorder.priority === "Low"
                        ? color.priLow
                        : data.workorder.priority === "Medium"
                          ? color.priMed
                          : data.workorder.priority === "High"
                            ? color.priHigh
                            : color.priUrg
                  },
                  details.infoText
                ]}
              >
                {data.workorder.priority}
              </Text>
            </View>
          </View>
          
          <View style={{ paddingBottom: 15 }}>
            <Text>
              {data.workorder.detail}
            </Text>
            <View style={details.statusDiv1}>
              <View style={details.iconCircleDiv}>
                <View
                  style={[
                    details.iconCircle,
                    {
                      backgroundColor:
                        data.workorder.status === "Open" ? "#00830B" : "#D8D8D8"
                    },
                    { textAlign: "center" }
                  ]}
                >
                  <Icon
                    color="#FFFFFF"
                    type="antdesign"
                    name="unlock"
                    size={25}
                    iconStyle={[details.icon, { margin: 5 }]}
                  />

                  {/* OPEN TEXT */}
                  <View style={[details.openTextDiv, { marginTop: 7 }]}>
                    <Text
                      style={[
                        {
                          color:
                            data.workorder.status === "Open"
                              ? "#00830B"
                              : "#89898E"
                        },
                        details.openText
                      ]}
                    >
                      Open
                    </Text>
                  </View>
                </View>

                {/* HOLD ////////////////////// */}
                <View
                  style={[
                    details.iconCircle,
                    {
                      backgroundColor:
                        data.workorder.status === "Hold" ? "#00830B" : "#D8D8D8"
                    },
                    { textAlign: "center" }
                  ]}
                >
                  <Icon
                    color="#FFFFFF"
                    type="antdesign"
                    name="pause"
                    size={25}
                    iconStyle={{ margin: 6 }}
                  />

                  {/* HOLD TEXT */}
                  <View style={[details.holdTextDiv, { marginTop: 7 }]}>
                    <Text
                      style={[
                        {
                          color:
                            data.workorder.status === "Hold"
                              ? "#00830B"
                              : "#89898E"
                        },
                        { marginLeft: 2 },
                        details.holdText
                      ]}
                    >
                      Hold
                    </Text>
                  </View>
                </View>

                {/* WORKING ///////////// */}
                <View
                  style={[
                    details.iconCircle,
                    {
                      backgroundColor:
                        data.workorder.status === "Working"
                          ? "#00830B"
                          : "#D8D8D8"
                    },
                    { textAlign: "center" }
                  ]}
                >
                  <Icon
                    color="#FFFFFF"
                    type="antdesign"
                    name="sync"
                    size={20}
                    iconStyle={{ margin: 10 }}
                  />

                  {/* WORKING TEXT */}
                  <View style={[details.workingTextDiv, { marginTop: 6 }]}>
                    <Text
                      style={[
                        {
                          color:
                            data.workorder.status === "Working"
                              ? "#00830B"
                              : "#89898E"
                        },
                        { width: 60 },
                        { marginLeft: -8 },
                        details.workingText
                      ]}
                    >
                      Working
                    </Text>
                  </View>
                </View>

                {/* DONE /////////////////////// */}
                <View
                  style={[
                    details.iconCircle,
                    {
                      backgroundColor:
                        data.workorder.status === "Done" ? "#00830B" : "#D8D8D8"
                    },
                    { textAlign: "center" }
                  ]}
                >
                  <Icon
                    color="#FFFFFF"
                    type="antdesign"
                    name="lock"
                    size={25}
                    iconStyle={{ margin: 6 }}
                    
                  />

                  {/* DONE TEXT */}
                  <View style={[details.workingTextDiv, { marginTop: 7 }]}>
                    <Text
                      style={[
                        {
                          color:
                            data.workorder.status === "Done"
                              ? "#00830B"
                              : "#89898E"
                        },
                        details.infoText
                      ]}
                    >
                      Done
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* BOTTOM DETAILS*/}
        <View style={details.bottomDetailsDiv}>
          <View style={details.iAmALine}>
            <Text style={details.bottomTitle}>Ticket #</Text>
            <Text style={details.bottomText}>
              {data.workorder.qrcode}
            </Text>
          </View>

          <View style={details.iAmALine}>
            <Text style={details.bottomTitle}>Created On</Text>
            <Text style={details.bottomText}>
              {createdAt}
            </Text>
          </View>

          <View style={details.iAmALine}>
            <Text style={details.bottomTitle}>Assigned To</Text>
            <Text style={[details.bottomText, details.userRedText]}>
              {data.workorder.user.username}
            </Text>
          </View>

          <View style={details.iAmALine}>
            <Text style={details.bottomTitle}>Created By</Text>
            <Text style={[details.bottomText, details.userRedText]}>
              {data.workorder.user.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={details.editButton}
          onPress={() => {
            navigation.navigate("EditWorkOrder", {
              id: id,
              qrcode: data.workorder.qrcode,
              detail: data.workorder.detail,
              priority: data.workorder.priority,
              status: data.workorder.status,
              title: data.workorder.title,
              user: data.workorder.user.username,
              workorderphoto: data.workorder.workorderphoto
            });
          }}
        >
          <Text style={[{ textAlign: "center" }, { color: "white" }]}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const details = StyleSheet.create({
  iAmALine: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F5F4",
    margin: 5
  },

  sameNavButtonStyles: {
    padding: 13
  },

  navDetailsButton: {
    paddingLeft: 15
  },

  bottomDetailsDiv: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F5F4",
    margin: 10,
    borderRadius: 7
  },

  bottomTitle: {
    fontWeight: "600",
    paddingTop: 15,
    paddingBottom: 15
  },

  navContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row"
  },

  bottomText: {
    paddingTop: 15,
    paddingBottom: 15
  },

  userRedText: {
    color: "red"
  },

  wOTitle: {
    fontWeight: "600"
  },

  // navLine1: {
  //   borderBottomWidth: 4,
  //   borderBottomColor: '#00830B',
  //   width: 150,
  // },

  topDetailsDiv: {
    margin: 25
  },

  titlePriorityDiv: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 13
  },

  statusDiv1: {
    marginLeft: -20,
    marginTop: 15
  },

  infoBackground: {
    borderRadius: 7,
    padding: 5
  },

  // imgDiv: {
  //   width: 375,
  //   height: 200,
  // },

  theDetsContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },

  iconCircleDiv: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20
  },

  iconCircle: {
    borderRadius: 50,
    width: 40,
    height: 40
  },

  editButton: {
    backgroundColor: "#00830B",
    paddingVertical: 15,
    borderRadius: 4,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    margin: 15
  }
});

export const wOForm = StyleSheet.create({
  imgCard: {
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    marginBottom: 10
  },
  imgCardTop: { marginTop: 10, marginBottom: 10 },
  imgCardBot: { marginTop: 10 },
  touchImage: {},
  imgUpload: {
    width: 375,
    height: 250,
    alignSelf: "center"
    // fontFamily: "IBMPlexSans-Regular"
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
    width: "100%",
    fontFamily: "IBMPlexSans-Regular"
  },
  statusDiv: {
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginTop: 0,
    borderRadius: 0
  },
  statusButton: { flexDirection: "column" },
  statusButtons: {
    backgroundColor: "#f4f3f3",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    margin: 3,
    flexDirection: "column",
    width: 80
  },
  statusButtonsText: {
    color: "#89898E",
    fontFamily: "IBMPlexSans-Regular",
    textAlign: "center",
    fontSize: 14
  },
  statusButtonsActive: {
    backgroundColor: "#009900"
  },
  submitButton: {
    backgroundColor: "#009900"
  },
  statusButtonsTextActive: {
    color: "white",
    fontFamily: "IBMPlexSans-Regular"
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
    justifyContent: "space-between"
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
    fontFamily: "IBMPlexSans-Regular",
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
    fontSize: 14,
    fontFamily: "IBMPlexSans-Regular"
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
    fontFamily: "IBMPlexSans-Regular",

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
    fontFamily: "IBMPlexSans-Regular",

    borderColor: "#C5C2C2",
    width: "102%",
    alignSelf: "center",
    padding: 10,
    height: 90,
    textAlignVertical: "top"
  }
});

export default Details;
