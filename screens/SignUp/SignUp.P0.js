import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet
} from "react-native";
import Email from "./Email.P3";
import Phone from "./Phone.P1";
import VerCode from "./VerCode.P2";

const SignUp = props => {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) =>
        <View>
          <Field name="lastName" placeholder="Doe" component={Phone} />
        </View>}
    </Formik>
  );
};
export default SignUp;
