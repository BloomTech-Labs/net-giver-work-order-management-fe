import * as React from "react";
import { FieldProps } from "formik";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import * as Permissions from "expo-permissions";

export class CameraField extends React.Component {
  onPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA);
    }
    const imageResult = await ImagePicker.launchCameraAsync({});
    const fileName = imageResult.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName);
    const mimeType = match ? `image/${match[1]}` : `image`;
    if (!imageResult.cancelled) {
      const file = new ReactNativeFile({
        uri: imageResult.uri,
        type: imageResult.type,
        name: mimeType
      });
      const { field: { name }, form: { setFieldValue } } = this.props;
      setFieldValue(name, file);
    }
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: _, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;
    return <Button {...props} onPress={this.onPress} />;
  }

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  // _onTakePic = async () => {
  //   const { cancelled, uri } = await ImagePicker.launchCameraAsync({});
  //   if (!cancelled) {
  //     this.setState({ imgUri: uri });
  //   }
  // };
}
