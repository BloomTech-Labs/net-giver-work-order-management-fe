import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  AsyncStorage,
  StyleSheet
} from "react-native";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { Header, Content, Item, Input, Toast } from "native-base";
import {
  useMutation,
  useQuery,
  useLazyQuery,
  useApolloClient
} from "@apollo/react-hooks";
import gql from "graphql-tag";
import { su1, su2, su3 } from "./SignUpStyles";
import ErrorMessage from "./ErrorMessage";
import { spacer } from "../../assets/style/components/margins";

const GET_VER_CODE = gql`
  query getCode($phone: String!, $email: String!) {
    getCode(phone: $phone, email: $email) {
      cellPhone
    }
  }
`;

const VERIFY_CODE = gql`
  mutation verifyCode($authyId: String!, $code: String!, $email: String!) {
    verifyCode(authyId: $authyId, code: $code, email: $email) {
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
      token
    }
  }
`;

const handleSubmit = ({
  values,
  verifyCode,
  client,
  navigation,
  setSubmitting,
  setErrors
}) => {
  const { code, authyId, email } = values;
  if (verifyCode) {
    verifyCode({ variables: { authyId: authyId, code: code, email: email } })
      .then(response => {
        const { verifyCode } = response.data;
        const token = verifyCode.token;
        client.writeData({ data: { isLoggedIn: true } });
        AsyncStorage.setItem("userToken", token);
        navigation.navigate("P3", { ...verifyCode });
      })
      // .then(signUp => {
      //   navigation.navigate("P3", { ...signUp });
      // })
      .catch(e => {
        const errors = e.graphQLErrors.map(error => {
          setErrors({ form: error.message });
        });
      });
  }
};

const VerCode = ({ navigation }) => {
  const [user, setUser] = useState(navigation.getParam("user", "errr"));
  const client = useApolloClient();
  const { loading, data, errored } = useQuery(GET_VER_CODE, {
    variables: {
      email: user.email,
      phone: user.phone
    }
  });

  const [verifyCode, { error }] = useMutation(VERIFY_CODE, {});
  return (
    <Formik
      initialValues={{
        phone: user.phone,
        email: user.email,
        code: "",
        authyId: user.authyId,
        username: user.authyId,
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
          client,
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
          <Text style={su2.subHead}>
            We just sent a one-time code to
            {`+1 ${values.phone}`}
          </Text>
          <View style={spacer.persmBot} />
          <Field name="code">
            {({ field, form }) =>
              <Item style={su1.input}>
                <Input
                  name={"code"}
                  value={values.code}
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  placeholder="7 digit code"
                  keyboardType="phone-pad"
                />
              </Item>}
          </Field>
          <ErrorMessage errorValue={touched.code && errors.code} />
          <Button
            onPress={handleSubmit}
            disabled={!isValid}
            buttonstyle={su2.button}
            title="Create Profile"
            titleStyle={su2.buttonText}
            loading={isSubmitting}
          />
          <ErrorMessage errorValue={errors.form} />
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
