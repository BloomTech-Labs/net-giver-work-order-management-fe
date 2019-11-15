import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet
} from "react-native";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { Header, Content, Item, Input, Toast } from "native-base";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { su1, su2, su3 } from "./SignUpStyles";
import ErrorMessage from "./ErrorMessage";

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

const VerCode = ({ navigation }) => {
  // const { email, phone } = navigation.state.params;
  const email = "bryantpatton@gmail.com";
  const phone = "4153163549";
  const authyId = "82620055";
  const { loading, data, errored } = useQuery(GET_VER_CODE, {
    variables: {
      email: email,
      phone: phone
    }
  });
  const [resendVerCode] = useLazyQuery(GET_VER_CODE, {
    variables: {
      email: email,
      phone: phone
    }
  });
  const [verifyCode, { error }] = useMutation(VERIFY_CODE, {});
  return (
    <Formik
      initialValues={{
        phone: phone,
        email: email,
        code: "",
        authyId: authyId,
        username: "",
        password: "password",
        displayName: "",
        photo: null
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
        isSubmitting
      }) =>
        <SafeAreaView>
          <Text style={su2.header}>We need to verify your phone number</Text>
          <Text style={su2.subHead}>We just sent a one-time code to</Text>
          <Text>
            {`+1 ${values.phone}`}
          </Text>
          <Field style={su1.input} name="code">
            {({ field, form }) =>
              <Item regular>
                <Input
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  placeholder="7 digit code"
                  keyboardType="phone-pad"
                  //   maxLength={10}
                  value={values.code}
                />
              </Item>}
          </Field>
          <ErrorMessage errorValue={errors.code} />
          <Button
            onPress={handleSubmit}
            disabled={!isValid}
            buttonstyle={su2.button}
            title="Create Profile"
            titleStyle={su2.buttonText}
            loading={isSubmitting}
          />
          <ErrorMessage errorValue={errors.form}>
            {/* <Button
              onPress={handleSubmit("resendVerCode")}
              disabled={!isValid}
              buttonstyle={su2.button}
              title="Create Profile"
              titleStyle={su2.buttonText}
              loading={isSubmitting}
            /> */}
          </ErrorMessage>
          <Text
            onPress={() => navigation.navigate("Contact")}
            style={su2.footer}
          >
            Contact the Net Giver Team
          </Text>
        </SafeAreaView>}
    />
  );
};

export default VerCode;
