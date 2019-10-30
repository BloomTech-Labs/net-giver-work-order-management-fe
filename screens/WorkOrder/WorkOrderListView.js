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
  StyleSheet
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { wOList, styles } from "../../components/Styles";
// import { token } from "../../token";

const GET_WORKORDERS = gql`
  query {
    users {
      username
      email
      role
      phone
      authyId
      picture
      workorders {
        id
        qrcode
        status
        priority
        title
        detail
      }
      photo {
        path
      }
    }
  }
`;

const WorkOrderListView = props => {
  console.log("TCL: WorkOrderListView -> props", props);
  const { data, loading, error } = useQuery(GET_WORKORDERS, {
    fetchPolicy: "no-cache"
  });

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={wOList.title}>
          Loading
          {console.log(loading)}
        </Text>
      </SafeAreaView>
    );
  //   if (error)
  //     return (
  //       <SafeAreaView style={styles.container}>
  //         <Text style={wOList.title}>
  //           Error :( {console.log(error)}
  //         </Text>
  //       </SafeAreaView>
  //     );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={wOList.title}>
        {console.log(data)}
      </Text>
    </SafeAreaView>
  );
  // <ScrollView>
  //   {console.log(data)
  // data.users.map(res =>
  //   // MAKE THE WHOLE BOX A BUTTON THAT CAN BE CLICKED TO OPEN THE w/o 10/24/2019 SD
  //   <TouchableOpacity onPress={() => console.log(token)}>
  //     {/* BUILD THE WORKORDER CARD 10/24/2019 SD */}
  //     {/* 3 FLEX COLUMNS */}
  //     <View style={wOList.card}>
  //       {/* FLEX COLUMN 1 LEFT HOLDS THE IMAGE FLEX SET TO 2 10/24/2019 SD */}
  //       <View style={wOList.cardLeft}>
  //         <Image style={wOList.image} source={{ uri: res.photoUrl }} />
  //       </View>
  //       {/* FLEX COLUMN 2 MIDDLE HOLDS THE WORK ORDER INFORMATION FLEX SET TO 4 10/24/2019 SD */}
  //       <View style={wOList.cardMiddle}>
  //         <Text style={wOList.title}>
  //           {res.title.slice(0, 15).concat("...")}
  //         </Text>
  //         <Text>
  //           Requested by {res.username}
  //         </Text>
  //         <Text>
  //           {res.status}
  //         </Text>
  //       </View>
  //       {/* FLEX COLUMN 3 RIGHT HOLDS THE PRIORITY/STATUS BADGES FLEX SET TO 2 10/24/2019 SD */}
  //       <View style={wOList.cardRight}>
  //         <Text>Priority:</Text>
  //         <Text>
  //           {res.priority}
  //         </Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  //)}
  //   })
  // </ScrollView>
};
export default WorkOrderListView;
