import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ME = gql`
  query currentUser {
    currentUser {
      username
      email
      role
      phone
      authyId
      displayName
      photo {
        path
      }
      workorders {
        id
        detail
        createdAt
        qrcode
        priority
        status
        title
        userId
        workorderphotos {
          path
          filename
          primaryPhoto
          photocount
          userId
        }
      }
    }
  }
`;

const AccountSettings = props => {
  const { data, loading, error } = useQuery(
    ME
    //   {
    //   fetchPolicy: "no-cache"
    // }
  );

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.nameText}>Loading</Text>
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
      <Text style={styles.nameText}>
        {data.currentUser.username}
      </Text>
    </SafeAreaView>
  );
};
export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row"
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2
  },
  sectionHeaderContainer: {
    backgroundColor: "#fbfbfb",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ededed"
  },
  sectionHeaderText: {
    fontSize: 14
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionContentText: {
    color: "#808080",
    fontSize: 14
  },
  nameText: {
    fontWeight: "600",
    fontSize: 18
  },
  slugText: {
    color: "#a39f9f",
    fontSize: 14,
    backgroundColor: "transparent"
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: "#4d4d4d"
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc"
  },
  colorTextContainer: {
    flex: 1
  }
});
