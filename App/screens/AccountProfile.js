import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

 const AccountProfile = (props) => {
   navigationOptions = {
    title: 'profile',
  };

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AccountProfile</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
  },
});
export default AccountProfile