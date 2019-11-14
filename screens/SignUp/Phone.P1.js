import React from "react";
import {
  SafeAreaView,
  Text,
  Button,
  Image,
} from "react-native";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { Item, Input } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { su1 } from "./SignUpStyles";
import ErrorMessage from "./ErrorMessage";

const SIGN_UP = gql`
  mutation registerAuthy($phone: String!, $email: String!) {
    registerAuthy(phone: $phone, email: $email) {
      user {
        id
        email
        phone
        authyId
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
      const { registerAuthy } = response;
      navigation.navigate("P2", { ...registerAuthy });
    })
    .catch(e => {
      const errors = e.graphQLErrors.map(error => {
        // alert(error.message);
        setErrors({ form: error.message });
      });
    });
};

const Phone = ({ navigation }) => {
  const [registerAuthy, { loading, error }] = useMutation(SIGN_UP, {});
  return (
    <Formik
      initialValues={{
        phone: "",
        email: ""
      }}
      validationSchema={Yup.object({
        phone: Yup.string()
          .length(10, "Enter 10 digit phone number")
          .required("Phone Required"),
        email: Yup.string()
          .min(3, "email must be at least 3 characters")
          .max(255)
          .email("Invalid email")
          .required("Required")
      })}
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
          <Field style={su1.input} name="phone">
            {({ field, form }) =>
              <Item regular>
                <Input
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder="Enter your Phone Number"
                  keyboardType="phone-pad"
                  autoCompleteType="tel"
                  maxLength={10}
                  value={values.phone}
                />
              </Item>}
          </Field>
          <ErrorMessage errorValue={errors.phone} />
          <Field style={su1.input} name="email">
            {({ field, form }) =>
              <Item regular>
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  onBlur={handleBlur("email")}
                  style={su1.input}
                  placeholder="Enter your Email"
                  value={values.email}
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
