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
                            <View style={wOList.cardSubContent}> 
                                <Text style={wOList.text}>Requested by {res.user.username}</Text>
                                <Text style={wOList.text}>10/22/19, 2:52PM</Text>
                            </View>
                        </View>
                        <View style={wOList.cardRight}>
                            <View style={[{backgroundColor: 
                                (res.status === 'Open' ? 'white' : 
                                res.status === 'In Progress' ? '#07BD51' :
                                res.status === 'On Hold' ? '#FFD3D3' :
                                '#878C90'
                                ), width: '100%' 
                                }, wOList.info, wOList.status]}>
                                <Text style={[{color: 
                                    (res.status === 'Open' ? '#087FFF' : 
                                    res.status === 'In Progress' ? 'white' :
                                    res.status === 'On Hold' ? '#FE273A' :
                                    'white'
                                    ),
                                    borderColor : (res.status === 'Open' ? '#878C90' : '')
                                    }, wOList.infoText]}>
                                    {res.status}
                                </Text>
                            </View>
                            <View style={wOList.qrPriority}>
                                <Text style={[wOList.info, wOList.qr , wOList.infoText]}>#{res.id}</Text>
                                <View style={[{backgroundColor: 
                                (res.priority === 'Low' ? '#E2F5FC' : 
                                res.priority === 'Medium' ? '#CBFBCB' :
                                res.priority === 'High' ? '#FFED9B' :
                                '#FFD3D3'
                                ), 
                                }, wOList.info, wOList.priority]}>
                                    <Text style={[{color: 
                                        (res.priority === 'Low' ? '#087FFF' : 
                                        res.priority === 'Medium' ? '#07BD51' :
                                        res.priority === 'High' ? '#DBA004' :
                                        '#FE273A'
                                        ), textAlign:'center', width: '100%'}, wOList.infoText]}>
                                        {res.priority}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            )}

      </ScrollView>
    );
}

export default WorkOrderListView;

