import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
const FirstName = () => {
  return (
    <View style={styles.container}>
      <Text> This is the firs Name Screen</Text>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }})
export default FirstName;
