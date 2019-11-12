import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-elements";
import { cbc } from "../../../assets/style";
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
      props.navigation.navigate("EditWorkOrder", {
        ...createWorkorder
      });
    }
  });

  if (loading)
    return (
      <SafeAreaView style={cbc.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Creating New Work Order</Text>
      </SafeAreaView>
    );
  if (error) {
    return (
      <SafeAreaView style={cbc.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={cbc.container}>
      <Text style={cbc.textMain}>
        Create A New Work Order number {qrcode}?
      </Text>
      <TouchableOpacity
        onPress={() =>
          createWorkorder({
            variables: {
              qrcode: qrcode
            }
          })}
        style={cbc.button}
      >
        <Text style={cbc.buttonText}>Create Work Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={cbc.button}
      >
        <Text style={cbc.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CheckBarCode;
