import * as React from "react";
import { FieldProps } from "formik";
import { ReactNativeFile } from "apollo-upload-client";
import { Input, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";

const errStyle = {
  color: "red"
};

export class InputField extends React.Component {
  onChangeText = text => {
    const { form: { setFieldValue }, field: { name } } = this.props;
    setFieldValue(name, text);
  };

  onPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync({});
    if (!imageResult.cancelled) {
      const file = new ReactNativeFile({
        uri: imageResult.uri,
        type: imageResult.type,
        name: "picture"
      });
      const { field: { name }, form: { setFieldValue } } = this.props;
      setFieldValue(name, file);
    }
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;
    const errorMsg = touched[field.name] && errors[field.name];
    const isPicture = field.type === "photo";
    return (
      <Input
        {...props}
        errorStyle={errStyle}
        errorMessage={errorMsg}
        onChangeText={this.onChangeText}
        value={field.value}
        keyboardType={field.keyboardType}
        isPicture={isPicture}
      />
    );
  }
}
