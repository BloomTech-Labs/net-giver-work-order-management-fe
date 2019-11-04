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

import { token } from "../../token";
import { StackActions, NavigationActions } from "react-navigation";
import { UserContext } from "../../context/userState";
import { conditionalExpression } from "@babel/types";

const GET_WORKORDERS = gql`
  query {
    workorders {
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
        workorderphotos {
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
  const { data, loading, error } = useQuery(
    GET_WORKORDERS,
    {
      // fetchPolicy: "no-cache"
    }
  );

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        {/* <Text style={wOList.title}>
          Loading
          {console.log(loading)}
        </Text> */}
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
      {data.workorders.edges.map(res =>
        <TouchableOpacity
          key={res.id}
          onPress={() =>
            props.navigation.navigate("EditWorkOrder", {
              wo: res
            })}
        >
          {/* BUILD THE WORKORDER CARD 10/24/2019 SD */}
          {/* 3 FLEX COLUMNS */}
          <View style={wOList.card}>
            {/* FLEX COLUMN 1 LEFT HOLDS THE IMAGE FLEX SET TO 2 10/24/2019 SD */}
            <View style={wOList.cardLeft}>
              {res.workorderphotos[0]
                ? <Image
                    style={wOList.image}
                    source={{ uri: res.workorderphotos[0].path }}
                  />
                : <Image
                    style={wOList.image}
                    source={{
                      uri:
                        "http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image"
                    }}
                  />}
            </View>
            {/* FLEX COLUMN 2 MIDDLE HOLDS THE WORK ORDER INFORMATION FLEX SET TO 4 10/24/2019 SD */}
            <View style={wOList.cardMiddle}>
              <Text style={wOList.title}>
                {res.title}
              </Text>
              <Text>Requested by:</Text>
              <Text>
                {res.user.username}
              </Text>
            </View>
            {/* FLEX COLUMN 3 RIGHT HOLDS THE PRIORITY/STATUS BADGES FLEX SET TO 2 10/24/2019 SD */}
            <View style={wOList.cardRight}>
              <Text>Priority:</Text>
              {res.priority === "N/A"
                ? <View
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.priority}
                    </Text>
                  </View>
                : <View />}
              {res.priority === "Low"
                ? <View
                    style={{
                      backgroundColor: "black",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {res.priority}
                    </Text>
                  </View>
                : <View />}
              {res.priority === "Medium"
                ? <View
                    style={{
                      backgroundColor: "orange",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.priority}
                    </Text>
                  </View>
                : <View />}
              {res.priority === "High"
                ? <View
                    style={{
                      backgroundColor: "purple",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.priority}
                    </Text>
                  </View>
                : <View />}
              {res.priority === "Emergency"
                ? <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.priority}
                    </Text>
                  </View>
                : <View />}
              <Text>Status:</Text>
              {res.status === "Not Started"
                ? <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.status}
                    </Text>
                  </View>
                : <View />}
              {res.status === "In Progress"
                ? <View
                    style={{
                      backgroundColor: "orange",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.status}
                    </Text>
                  </View>
                : <View />}
              {res.status === "Complete"
                ? <View
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      width: "95%"
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {res.status}
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
