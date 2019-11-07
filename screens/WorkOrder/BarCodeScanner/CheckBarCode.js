import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Button } from "native-base";
import { styles } from "../../../components/Styles";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

const CREATE_WORK_ORDER = gql`
  mutation createWorkorder($qrcode: String!) {
    createWorkorder(qrcode: $qrcode) {
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

const CheckBarCode = props => {
  const qrcode = props.navigation.state.params.qrData;
  const [createWorkorder, { loading, error }] = useMutation(CREATE_WORK_ORDER, {
    onCompleted({ createWorkorder }) {
      const qrcode = createWorkorder.qrcode;
      props.navigation.navigate("EditWorkOrder", { ...createWorkorder });
    }
  });

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Creating New Work Order</Text>
      </SafeAreaView>
    );
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Create A New Work Order number {qrcode}?
      </Text>
      <Button
        onPress={() =>
          createWorkorder({
            variables: {
              qrcode: qrcode
            }
          })}
        style={styles.button}
      >
        <Text>Confirm</Text>
      </Button>
      <Button onPress={() => props.navigation.goBack()} style={styles.button}>
        <Text>Go Back!</Text>
      </Button>
    </View>
  );
};
export default CheckBarCode;
