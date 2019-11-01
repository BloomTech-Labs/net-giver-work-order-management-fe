import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
// import { token } from "../../../token";
import { styles } from "../../../components/Styles";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

const CREATE_WORK_ORDER = gql`
  mutation createWorkorder($qrcode: String!) {
    createWorkorder(qrcode: $qrcode) {
      id
      qrcode
      detail
      createdAt
      priority
      status
      title
    }
  }
`;

const NewWorkOrderQR = ({ navigation, qrcode }) => {
  const [createWorkorder, { loading, error }] = useMutation(CREATE_WORK_ORDER, {
    onCompleted({ createWorkorder }) {
      //const qrcode = createWorkorder.qrcode;
      navigation.navigate("NewWorkOrder", {
        qrcode: createWorkorder.qrcode
      });
    }
  });
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
        <ActivityIndicator size="large" color="black" />
        <Text>error</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Text>Text</Text>
    </SafeAreaView>
  );
};

export default NewWorkOrderQR;
