import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { styles } from "../../assets/style";
import { Button } from "native-base";

const GET_WORKORDERS = gql`
  query Workorders($limit: Int, $cursor: String) {
    workorders(limit: $limit, cursor: $cursor) {
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
  const { data, loading, error, fetchMore } = useQuery(GET_WORKORDERS, {
    variables: { limit: 3 }
  });
  const [selectedWo, setSelectedWo] = useState(null);

  const onLoadMore = () =>
    fetchMore({
      variables: {
        cursor: data.workorders.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.workorders.edges;
        const pageInfo = fetchMoreResult.workorders.pageInfo;
        console.log(newEdges);

        return newEdges.length
          ? {
              // Put the new comments at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              workorders: {
                __typename: previousResult.workorders.__typename,
                edges: [...previousResult.workorders.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });

  const formatDate = createdAt => {
    const date = new Date(createdAt);
    let formattedDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    return formattedDate;
  };

  const goToDetails = workorder =>
    props.navigation.push("Details", {
      ...workorder,
      createdAt: formatDate(workorder.createdAt)
    });

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
        <Text style={wOList.title}>Error</Text>
      </SafeAreaView>
    );
  return (
    <ScrollView>
      <View>
        {data.workorders.edges.map(workorder =>
          <TouchableOpacity
            key={workorder.id}
            onPress={() => goToDetails(workorder)}
          >
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
                    {formatDate(workorder.createdAt)}
                    {/* {workorder.dateCreated} */}
                  </Text>
                </View>
              </View>
              <View style={wOList.cardRight}>
                <View
                  style={[
                    {
                      backgroundColor:
                        workorder.status === "Open"
                          ? "white"
                          : workorder.status === "Working"
                            ? "#07BD51"
                            : workorder.status === "Done"
                              ? "#FFD3D3"
                              : "#878C90",
                      borderWidth: workorder.status === "Open" ? 0.5 : 0,
                      borderColor: "#878C90",
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
                          workorder.status === "Open"
                            ? "#878C90"
                            : workorder.status === "Working"
                              ? "white"
                              : workorder.status === "Done"
                                ? "#FE273A"
                                : "white",
                        borderColor:
                          workorder.status === "Open" ? "#878C90" : "white"
                      },
                      wOList.infoText
                    ]}
                  >
                    {workorder.status}
                  </Text>
                </View>
                <View style={wOList.priorityBox}>
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
                  <View style={[wOList.qrBox]}>
                    <Text style={[wOList.info, wOList.qr, wOList.infoText]}>
                      #{workorder.qrcode}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Button onPress={onLoadMore} style={styles.button}>
        <Text>Try again!</Text>
      </Button>
    </ScrollView>
  );
};
export default WorkOrderListView;

const wOList = StyleSheet.create({
  card: {
    width: "100%",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 4,
    paddingLeft: 9,
    paddingRight: 14,
    paddingTop: 13,
    paddingBottom: 31,
    alignSelf: "center",
    flexDirection: "row"
  },
  info: {
    borderRadius: 4,
    height: 20
  },
  infoText: {
    fontSize: 14,
    textAlign: "center"
  },
  status: {
    width: 65,
    alignSelf: "flex-end"
  },

  priority: {
    width: 65,
    marginBottom: 6,
    marginTop: 6,
    marginLeft: 5
  },

  qr: {
    width: 65,
    color: "#8B9195",
    backgroundColor: "#F2F5F7",
    alignSelf: "flex-end",
    marginLeft: 5
  },

  qrBox: {
    flexDirection: "row"
  },

  cardMiddle: {
    //width: 160,
    flex: 1
    //paddingRight: 5,
  },

  priorityBox: {
    flexDirection: "column",
    marginLeft: "auto",
    alignSelf: "flex-end"
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    lineHeight: 22
  },
  cardSubContent: {
    flexDirection: "column"
  },
  cardLeft: {
    width: "auto"
  },
  cardRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto",
    marginTop: 6,

    marginBottom: 6
  },
  image: {
    flex: 1,
    flexWrap: "wrap",
    width: 64,
    height: 64,
    borderRadius: 4,
    marginRight: 22
  },
  title: {
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 1
  }
});
