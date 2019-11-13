import React from "react";
import {
  AccessibilityStates,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class Button extends React.Component {
  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      disabled,
      testID
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    if (color) {
      if (Platform.OS === "ios") {
        textStyles.push({ color });
      } else {
        buttonStyles.push({ backgroundColor: color });
      }
    }
    const accessibilityStates = [];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityStates.push("disabled");
    }
    const formattedTitle =
      Platform.OS === "android" ? title.toUpperCase() : title;
    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityStates={accessibilityStates}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyles}>
          <Text style={textStyles}>
            {formattedTitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    android: {
      backgroundColor: "#2196F3",
      borderRadius: 2,
      elevation: 4
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
    },
    ios: {}
  }),
  buttonDisabled: Platform.select({
    android: {
      backgroundColor: "#dfdfdf",
      elevation: 0
    },
    ios: {}
  }),
  text: {
    padding: 8,
    textAlign: "center",
    ...Platform.select({
      android: {
        color: "white",
        fontWeight: "500"
      },
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        color: "#007AFF",
        fontSize: 18
      }
    })
  },
  textDisabled: Platform.select({
    android: {
      color: "#a1a1a1"
    },
    ios: {
      color: "#cdcdcd"
    }
  })
});
