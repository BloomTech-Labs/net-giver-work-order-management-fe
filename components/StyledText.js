import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export function RobotoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Roboto' }]} />
  );
}
