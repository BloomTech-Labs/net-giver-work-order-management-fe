import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { wOList, styles } from "../../components/Styles";

import EditWorkOrder from "./ExistingWorkOrder/EditWorkOrder";

import { StackActions, NavigationActions } from "react-navigation";
import { conditionalExpression } from "@babel/types";

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
    props.navigation.push("EditWorkOrder", { ...workorder });

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text style={wOList.title}>
          Loading
          {console.log(loading)}
        </Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={wOList.title}>
          Error :( {console.log(error)}
        </Text>
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
                    source={{ uri: workorder.workorderphotos[0].path }}
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
              <Text style={wOList.title}>
                {workorder.title}
              </Text>
              <Text>Requested by:</Text>
              <Text>
                {workorder.user.username}
              </Text>
            </View>
            {/* FLEX COLUMN 3 RIGHT HOLDS THE PRIORITY/STATUS BADGES FLEX SET TO 2 10/24/2019 SD */}
            <View style={wOList.cardRight}>
              <Text>Priority:</Text>
              {workorder.priority === "N/A"
                ? <View
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.priority}
                    </Text>
                  </View>
                : <View />}
              {workorder.priority === "Low"
                ? <View
                    style={{
                      backgroundColor: "black",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {workorder.priority}
                    </Text>
                  </View>
                : <View />}
              {workorder.priority === "Medium"
                ? <View
                    style={{
                      backgroundColor: "orange",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.priority}
                    </Text>
                  </View>
                : <View />}
              {workorder.priority === "High"
                ? <View
                    style={{
                      backgroundColor: "purple",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.priority}
                    </Text>
                  </View>
                : <View />}
              {workorder.priority === "Emergency"
                ? <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.priority}
                    </Text>
                  </View>
                : <View />}
              <Text>Status:</Text>
              {workorder.status === "Not Started"
                ? <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.status}
                    </Text>
                  </View>
                : <View />}
              {workorder.status === "In Progress"
                ? <View
                    style={{
                      backgroundColor: "orange",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.status}
                    </Text>
                  </View>
                : <View />}
              {workorder.status === "Complete"
                ? <View
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {workorder.status}
                    </Text>
                  </View>
                : <View />}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
export default WorkOrderListView;
