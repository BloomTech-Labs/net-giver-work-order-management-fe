import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { styles } from "../../assets/style";

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
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

const UploadOneFile = () => {
  return (
    <Mutation mutation={UPLOAD_FILE}>
      {uploadFile =>
        <input
          type="file"
          required
          onChange={({ target: { validity, files: [file] } }) =>
            validity.valid && uploadFile({ variables: { file } })}
        />}
    </Mutation>
  );
};

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
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={wOList.title}>Error :(</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nameText}>
        {data.currentUser.username}
        {/* <UploadOneFile /> */}
      </Text>
    </SafeAreaView>
  );
};
export default AccountSettings;
