import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { wOList, styles } from "../../components/Styles";
import EditWorkOrder from "./ExistingWorkOrder/EditWorkOrder";

const GET_WORKORDERS = gql`
  query workorders($limit: Int) {
    workorders(limit: $limit) {
      edges {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const WorkOrderListView = props => {
  const [sentFrom, setSentFrom] = useState();
  const { data, loading, error } = useQuery(GET_WORKORDERS, {
    variables: { limit: 5 }
  });
  const [selectedWo, setSelectedWo] = useState(null);

  const goToWo = workorder =>
    props.navigation.push("EditWorkOrder", {
      ...workorder,
      pagetitle: "Edit Workorder"
    });

  const goToDetails = workorder =>
    props.navigation.push("Details", { ...workorder });

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text style={wOList.title}>Loading</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={wOList.title}>Error :(</Text>
      </SafeAreaView>
    );
  return (
    <ScrollView>
      {selectedWo && <EditWorkOrder data={selectedWo} />}
      {data.workorders.edges.map(workorder =>
        <TouchableOpacity key={workorder.id} onPress={() => goToWo(workorder)}>
          <View style={wOList.card}>
            <View style={wOList.cardLeft}>
              {workorder.workorderphoto
                ? <Image
                    style={wOList.image}
                    source={{ uri: workorder.workorderphoto.path }}
                  />
                : <Image
                    style={wOList.image}
                    source={{
                      uri:
                        "http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image"
                    }}
                  />}
            </View>
            <View style={wOList.cardMiddle}>
              <View style={{ flexDirection: "row" }}>
                <Text style={wOList.title} numberOfLines={1}>
                  {workorder.title}
                </Text>
              </View>

              <View style={wOList.cardSubContent}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={wOList.text} numberOfLines={1}>
                    {workorder.user.username}
                  </Text>
                </View>
                <Text style={wOList.text} numberOfLines={1}>
                  10/22/19, 2:52PM
                  {/* {workorder.dateCreated} */}
                </Text>
              </View>
            </View>
            <View style={wOList.cardRight}>
              <View
                style={[
                  {
                    backgroundColor:
                      workorder.status === "Not Started"
                        ? "white"
                        : workorder.status === "In Progress"
                          ? "#07BD51"
                          : workorder.status === "Complete"
                            ? "#FFD3D3"
                            : "#878C90",
                    width: "100%"
                  },
                  wOList.info,
                  wOList.status
                ]}
              >
                <Text
                  style={[
                    {
                      color:
                        workorder.status === "Not Started"
                          ? "#087FFF"
                          : workorder.status === "In Progress"
                            ? "white"
                            : workorder.status === "Complete"
                              ? "#FE273A"
                              : "white",
                      borderColor:
                        workorder.status === "Not Started" ? "#878C90" : "white"
                    },
                    wOList.infoText
                  ]}
                >
                  {workorder.status}
                </Text>
              </View>
              <View style={wOList.qrPriority}>
                <Text style={[wOList.info, wOList.qr, wOList.infoText]}>
                  #{workorder.id}
                </Text>
                <View
                  style={[
                    {
                      backgroundColor:
                        workorder.priority === "Low"
                          ? "#E2F5FC"
                          : workorder.priority === "Medium"
                            ? "#CBFBCB"
                            : workorder.priority === "High"
                              ? "#FFED9B"
                              : "#FFD3D3"
                    },
                    wOList.info,
                    wOList.priority
                  ]}
                >
                  <Text
                    style={[
                      {
                        color:
                          workorder.priority === "Low"
                            ? "#087FFF"
                            : workorder.priority === "Medium"
                              ? "#07BD51"
                              : workorder.priority === "High"
                                ? "#DBA004"
                                : "#FE273A",
                        textAlign: "center",
                        width: "100%"
                      },
                      wOList.infoText
                    ]}
                  >
                    {workorder.priority}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
export default WorkOrderListView;
