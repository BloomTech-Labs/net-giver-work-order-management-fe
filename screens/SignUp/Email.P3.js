import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from "react-native";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { su3 } from "./SignUpStyles";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import * as Permissions from "expo-permissions";
import {
  Text as NativeText,
  ActionSheet,
  Button as NativeButton,

} from "native-base";

const GET_VER_CODE = gql`
  query getCode($phone: String!, $email: String!) {
    getCode(phone: $phone, email: $email) {
      cellPhone
    }
  }
`;

const VERIFY_CODE = gql`
  mutation verifyCode($authyId: String!, $code: String!) {
    verifyCode(authyId: $authyId, code: $code) {
      user {
        id
        phone
        authyId
      }
      token
    }
  }
`;
const isEmail = RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

const handleSubmit = ({
  values,
  verifyCode,
  resendVerCode,
  navigation,
  setSubmitting,
  setErrors
}) => {
  const { code, authyId } = values;
  if (verifyCode) {
    verifyCode({ variables: { authyId: authyId, code: code } })
      .then(response => {
        const { signUp } = response;
        navigation.navigate("P3", { ...signUp });
      })
      .catch(e => {
        const errors = e.graphQLErrors.map(error => {
          setErrors({ form: error.message });
        });
      });
  }
  if (resendVerCode) {
    resendVerCode({ variables: { authyId: authyId, code: code } })
      .then(response => {
        const { signUp } = response;
        navigation.navigate("P3", { ...signUp });
      })
      .catch(e => {
        const errors = e.graphQLErrors.map(error => {
          setErrors({ form: error.message });
        });
      });
  }
};

const Email = ({ navigation }) => {
  // const { email, phone } = navigation.state.params;
  const email = "bryantpatton@gmail.com";
  const phone = "4153163549";
  const authyId = "82620055";
  const [photo, setPhoto] = useState(navigation.getParam("photo", "nophoto"));
  const [photouri, setPhotouri] = useState(photo.uri);
  const placeholderImg =
    "http://placehold.jp/006e13/ffffff/200x200.png?text=Click%20to%20Add%20an%20Image";
  const BUTTONS = [
    { text: "Gallery" },
    { text: "Take Photo" },
    { text: "Cancel" }
  ];
  const CANCEL_INDEX = 2;
  const [verifyCode, { error }] = useMutation(VERIFY_CODE, {});
  return (
    <Formik
      initialValues={{
        phone: phone,
        email: email,
        code: "",
        authyId: authyId,
        displayName: "",
        password: "password",
        displayName: "",
        photo: {}
      }}
      validationSchema={Yup.object({
        code: Yup.string()
          .length(7, "Enter 7 digit code")
          .required("Code Required")
      })}
      onSubmit={(values, { setSubmitting, setErrors }) =>
        handleSubmit({
          verifyCode,
          resendVerCode,
          navigation,
          values,
          setSubmitting,
          setErrors
        })}
      toCamera={navigation =>
        navigation.navigate("CameraModule", {
          from: "P3",
          phone: phone,
          verCode: ver
        })}
      render={({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        setFieldValue,
        status,
        isSubmitting,
        toCamera
      }) =>
        <SafeAreaView>
          <Text style={su3.header}>Create your Profile</Text>
          <Text style={su3.subHead}>So your colleagues can recognize you!</Text>
          <TouchableOpacity style={su3.avatar} onPress={toCamera}>
            {values.photo.uri
              ? <Image
                  style={su3.image}
                  source={{
                    uri: values.photo.uri
                  }}
                />
              : <Image
                  style={su3.image}
                  source={{
                    uri: placeholderImg
                  }}
                />}
            <Text style={su3.avatarText}>Tap to add</Text>
          </TouchableOpacity>
          {/* <Content padder> */}
          <Field
            style={su3.avatar}
            titleStyle={su3.subHead}
            //   buttonStyle={wOForm.submitButton}
            name="photo"
          >
            {({ field, form }) =>
              <NativeButton
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Add an image"
                    },
                    buttonIndex => {
                      if (buttonIndex !== 2) {
                        const find = async () => {
                          const { status } = await Permissions.getAsync(
                            buttonIndex === 0
                              ? Permissions.CAMERA_ROLL
                              : Permissions.CAMERA
                          );
                          if (status !== "granted") {
                            await Permissions.askAsync(
                              buttonIndex === 0
                                ? Permissions.CAMERA_ROLL
                                : Permissions.CAMERA
                            );
                          }
                          const imageResult =
                            buttonIndex === 0
                              ? await ImagePicker.launchImageLibraryAsync({})
                              : await ImagePicker.launchCameraAsync({});
                          const fileName = imageResult.uri.split("/").pop();
                          const match = /\.(\w+)$/.exec(fileName);
                          const mimeType = match
                            ? `image/${match[1]}`
                            : `image`;
                          if (!imageResult.cancelled) {
                            const file = new ReactNativeFile({
                              uri: imageResult.uri,
                              type: imageResult.type,
                              name: mimeType
                            });
                            setFieldValue("photo", file);
                          }
                        };
                        find();
                      }
                    }
                  )}
              >
                <Text>Choose a Photo</Text>
              </NativeButton>}
          </Field>
          {/* </Content> */}
          <TextInput
            style={su3.input}
            placeholder="displayName"
            onChangeText={handleChange("displayName")}
            onBlur={handleBlur("displayName")}
            value={values.displayName}
          />
          <TextInput
            style={su3.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <TouchableOpacity style={su3.button} onPress={handleSubmit}>
            <Text style={su3.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={su3.tosBox}>
            <Text style={su3.tosFont}>
              By pressing "Next" above, you agree to our{" "}
              <Text
                onPress={() => navigation.navigate("TOS")}
                style={su3.underline}
              >
                terms of service{" "}
              </Text>
              and{" "}
              <Text
                style={su3.underline}
                onPress={() => navigation.navigate("PP")}
              >
                privacy policy.
              </Text>
            </Text>
          </View>
          <Text
            onPress={() => navigation.navigate("Contact")}
            style={su3.subHead}
          >
            Contact the Net Giver Team
          </Text>
        </SafeAreaView>}
    />
  );
};

export default Email;
