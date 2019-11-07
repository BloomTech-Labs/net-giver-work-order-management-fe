import * as React from "react";
import { FieldProps } from "formik";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import * as Permissions from "expo-permissions";

export class PictureField extends React.Component {
  onPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync({});
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
}
