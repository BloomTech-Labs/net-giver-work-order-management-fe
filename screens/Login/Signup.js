import React, { useState, useRef, useContext, useEffect } from "react";
import { withFormik, Formik, Form, FormikErrors, FormikProps, Field } from "formik";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Button } from 'native-base'
import Swiper from 'react-native-swiper';
import { Overlay, Card } from "react-native-elements";
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../../context/userState";
import { loginStyles } from '../../components/Styles';
import { isUpdateExpression } from "@babel/types";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { signupstyles, pages} from './SignupStyles'
import {InputField} from '../../components/shared/InputField'
import { PictureField } from '../../components/shared/PictureField'

const SIGN_UP = gql`
  mutation signUp(
    $username: String!, $email: String!, $password: String!,
    $phone: String!
  ) {
    signUp(username: $username, email: $email, password: $password,
    phone: $phone) {
    token
    user {
      username
      authyId
    }
    }
  }
`;

const PROFILE_PIC = gql`
mutation uploadUserPhoto($photo: Upload!) { 
  uploadUserPhoto(photo: $photo) { 
    userId
    filename
    path 
    }
}
`;

const Signup = props => {
  const [disabled, setDisabled] = useState(false);
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [err, setErr] = useState();
  const [photoUri, setPhotoUri] = useState();
  const [current, setCurrent] = useState(0);
  // const { user, addUser } = useContext(UserContext)
  const [user, addUser]  = useState({})
  const swipeRef = useRef();

  const [photo, setPhoto] = useState({})
  const [uploadUserPhoto, { picloading, picerror }] = useMutation(PROFILE_PIC, {
    onCompleted({ uploadUserPhoto }) {
      const res = uploadUserPhoto;
      navigation.navigate("WorkOrderList", {

      });
    }
  });

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted({ signUp }) {
      const res = signUp;
      const token = signUp.token
      AsyncStorage.setItem('userToken', token).then(() => {
        uploadUserPhoto({
          variables: {
            photo: values.photo
          }
        })
      })


    }
  });

  const onInputChange = (name, text) => {
    const updatedUser = { ...formValues, [name]: text };
    setFormValues(updatedUser)
  };

  const handlePhoto = (uri) => {
    setPhotoUri(uri)
    let fileName = uri.split('/').pop()
    let match = /\.(\w+)$/.exec(fileName)
    let mimeType = match ? `image/${match[1]}` : `image`
    setPhoto({ uri: uri, name: fileName, type: mimeType })
  }

  const handleNext = (values) => {
    //this function will set page to the next page when schema passes and change state
    // setFormValues({ ...formValues, ...values });
    swipeRef.current.scrollBy(1, true)
    setCurrent(current + 1)
  }


  const PhotoInput = () => {
    return (
      <TouchableOpacity
        style={signupstyles.photoContainer}
        //onPress={() => handlePhoto("http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image")}
         onPress={() => navigation.navigate('Camera', { from: 'Signup', callback: handlePhoto })}
      >
        {!photoUri
          ? <Ionicons
            name="md-camera"
            color="white"
            size={90}
          />
          : <Image
            style={{
              alignSelf: 'center',
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
            }}
            source={{ uri: photoUri }}
            resizeMode="cover"
          />
        }
      </TouchableOpacity>

      
    )
  }
  const TextTos = () => {
    return (
      
     
        <><Text style={styles.textToS}>By pressing submit you agree to our </Text><Text style={styles.textToS}  onPress={()=> props.navigation.navigate('TOS')} >Terms of Service</Text><Text style={styles.textToS}> and</Text> <Text style={styles.textToS} onPress={()=> props.navigation.navigate('PP')}> Privacy Policy.</Text></>
      
      
    )
  }

  return (
    <KeyboardAvoidingView style={signupstyles.container} behavior="padding">
      <Overlay
        isVisible={toggleOverlay}
        onBackdropPress={() => setToggleOverlay(false)}
      >
        <>
          <Text>Some Random Message</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      </Overlay>
      <Formik 
      initialValues={{
          phone: phone || "4153163549",
          password: password || "password",
          username: username || "user3214",
          email: email || "user3214@gmail.com",
          displayName: displayName || "wilbert"
      }}
        onSubmit={async (values, { resetForm }) =>
          handleSubsribe({
            values,
            subscribeMutation,
            resetForm
          })
        }
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Before submitting you need to provide your email')
        })}

        render={() => (
          <Form>
      
        <Swiper
          ref={swipeRef}
          style={signupstyles.wrapper}
          showsButtons={false}
          disableNextButton={disabled}
          loop={false}
          buttonWrapperStyle={{ position: "relative", marginVertical: 80, paddingHorizontal: 0 }}
        >
          
          {pages.map((input, index) => {
            return (
              <View style={signupstyles['slide' + ++index]} key={'slide' + input.id}>
                {input.image ? <Image style={loginStyles.logo} source={require('../../components/Images/ng.png')} /> : null}
                {input.topComponent}
                {input.slideTitle &&
                  <Text style={signupstyles.title}> {input.slideTitle} </Text>
                }
                <Text style={signupstyles.text}> {input.text} </Text>
                <View style={signupstyles.inputContainer}>
                  <Text style={signupstyles.text}> {input.text2} </Text>

                  {/* <TextInput
                    key={input.name + input.id}
                    name={input.name}
                    value={formValues[input.name]}
                    keyboardType={input.keyboard}
                    onChangeText={(text) => onInputChange(input.name, text)}
                    placeholder={input.placeholder}
                    style={signupstyles.input}
                  /> */}
                  {
                    input.type ==="photo" ?
                      <Field
                        name="photo"
                        title="pick a picture"
                        component={PictureField}
                        style={signupstyles.input}
                      />
                      : 
                      <Field
                        key={input.name + input.id}
                        name={input.name}
                        placeholder={input.placeholder}
                        component={InputField}
                        autoCapitalize="none"
                        inputStyle={signupstyles.input}
                        keyboardType={input.keyboard}
                        schema={input.schema}
                        errors={errors}
                      // touched={touched}
                      />
                  }
                  {errors.name && touched.name && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {errors.name}
                    </div>
                  )}


                  <TouchableOpacity
                    style={signupstyles.buttonStyle}
                    onPress={() => input.button === "Submit" ? 
                      signUp({
                        variables: {
                          username: values.username,
                          email: values.email,
                          phone: values.phone,
                          password: values.email
                        }
                      })
                    : 
                    handleNext()
                  }
                  >
                    <Text style={signupstyles.buttonText}>{input.button}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </Swiper>
          </Form>
        )}
        />
    </KeyboardAvoidingView>
  );


}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .min(10, 'Enter 10 digit phone number')
    .max(10, 'Enter 10 digit phone number')
    .required('Phone Required'),
  email: Yup.string()
    .min(3, "email must be at least 3 characters")
    .max(255)
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(3, "password must be at least 3 characters")
    .max(255)
    .required('Required'),    
  displayName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});


// export const Signup = withFormik({
//   validationSchema: SignupSchema,
//   mapPropsToValues({ phone, password, username, email, displayName }) {
//     return {
//       phone: phone || "4153163549",
//       password: password || "password",
//       username: username || "user3214",
//       email: email || "user3214@gmail.com",
//       displayName: displayName || "wilbert"
//     };
//   },


  // handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
  //   //const errors = await props.submit(values);
  //   const errors = await signUp({
  //     variables: {
  //       username: formValues.username,
  //       email: formValues.email,
  //       phone: formValues.phone,
  //       password: 'password'
  //     }
  //   })
  //   if (errors) {
  //     setErrors(errors);
  //   }
  // }
// })(SignupForm);

export default Signup
