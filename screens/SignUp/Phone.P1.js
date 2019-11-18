import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  Image,
  StyleSheet
} from "react-native";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { Header, Content, Item, Input, Toast } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { su1, su2, su3 } from "./SignUpStyles";
import ErrorMessage from "./ErrorMessage";
import { styles } from "../../assets/style";
import FormButton from "./components/FormButton";
import { topBtn } from "../../assets/style/components/buttons";
import { spacer } from "../../assets/style/components/margins";
import { text } from "../../assets/style/components/text";
import { txtInput } from "../../assets/style/components/inputs";

const SIGN_UP = gql`
  mutation registerAuthy($phone: String!, $email: String!) {
    registerAuthy(phone: $phone, email: $email) {
      user {
        id
        username
        email
        role
        phone
        authyId
        displayName
        photo {
          path
        }
      }
    }
  }
`;

const handleSubmit = ({
  values,
  registerAuthy,
  navigation,
  setSubmitting,
  setErrors
}) => {
  const { phone, email } = values;
  registerAuthy({ variables: { phone: phone, email: email } })
    .then(response => {
      const { registerAuthy } = response.data;
      navigation.navigate("P2", { ...registerAuthy });
    })
    .catch(e => {
      const errors = e.graphQLErrors.map(error => {
        // alert(error.message);
        setErrors({ form: error.message });
      });
    });
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .label("phone")
    .length(10, "Enter 10 digit phone number")
    .required("Phone Required"),
  email: Yup.string()
    .label("email")
    .max(255)
    .email("Invalid email")
    .required("Email Required")
});

const Phone = ({ navigation }) => {
  const [registerAuthy, { loading, error }] = useMutation(SIGN_UP, {});
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Formik
      initialValues={{
        phone: "",
        email: ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setErrors }) =>
        handleSubmit({
          registerAuthy,
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
          <Image
            style={su1.logo}
            source={require("../../components/Images/ng.png")}
          />
          <Text style={su1.header}>Sign Up</Text>
          <Text style={su1.subHead}>And leave your paperwork behind!</Text>
          <View style={spacer.persmBot} />
          <Field name="phone">
            {({ field, form }) =>
              <Item style={su1.input}>
                <Input
                  name={"phone"}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder="Enter your Phone Number"
                  keyboardType="phone-pad"
                  autoCompleteType="tel"
                  maxLength={10}
                />
              </Item>}
          </Field>
          <ErrorMessage errorValue={touched.phone && errors.phone} />
          <Field name="email">
            {({ field, form }) =>
              <Item style={su1.input}>
                <Input
                  name={"email"}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your Email"
                  autoCapitalize="none"
                />
              </Item>}
          </Field>
          <ErrorMessage errorValue={errors.email} />
          <Button
            onPress={handleSubmit}
            disabled={!isValid}
            buttonStyle={su1.button}
            title="Get Started"
            titleStyle={su1.buttonText}
            loading={isSubmitting}
          />
          <ErrorMessage errorValue={errors.form} />
          <Text
            onPress={() => navigation.navigate("Contact")}
            style={su1.subHead}
          >
            Contact the Net Giver Team
          </Text>
        </SafeAreaView>}
    />
  );
};

export default Phone;
