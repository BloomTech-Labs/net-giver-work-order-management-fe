import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Net Giver Work Order Management</Text>
      <View style={styles.wrapper}>
        {/* NAVIGATE TO LOGIN OR SIGNUP PAGE */}
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Signup')}>
          <Text style={styles.link}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  wrapper: {
    flexDirection: 'row'
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
    marginBottom: 5,
    margin: 10
  }
});
export default Home;
