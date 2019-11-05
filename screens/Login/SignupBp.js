import React, { useState, useRef, useContext, useEffect } from "react";
import { Formik } from 'formik';
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
import Swiper from 'react-native-swiper';
import { Overlay } from 'react-native-elements';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../../context/userState";
import { loginStyles } from '../../components/Styles';
import { isUpdateExpression } from "@babel/types";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

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



const Signup = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [err, setErr] = useState();
  const [photoUri, setPhotoUri] = useState();
  const [current, setCurrent] = useState(0);
  // const { user, addUser } = useContext(UserContext)
  const [user, addUser]  = useState({})
  const swipeRef = useRef();
  var [formValues, setFormValues] = useState({
    fullname: "testcde",
    email: "testabc@gmail.com",
    phone: "4153163549"
  })
  const [photo, setPhoto] = useState({})
  const [uploadUserPhoto, { picloading, picerror }] = useMutation(PROFILE_PIC, {
    onCompleted({ uploadUserPhoto }) {
      const res = uploadUserPhoto;
      props.navigation.navigate("WorkOrderListView", {

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
            photo: photo
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
    setFormValues({ ...formValues, ...values });
    swipeRef.current.scrollBy(1, true)
    setCurrent(current + 1)
  }


  const PhotoInput = () => {
    return (
      <TouchableOpacity
        style={styles.photoContainer}
        //onPress={() => handlePhoto("http://placehold.jp/006e13/ffffff/200x250.png?text=Placeholder%20Image")}
         onPress={() => props.navigation.navigate('Camera', { from: 'Signup', callback: handlePhoto })}
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

  const pages = [

    {
      image: true,
      type: "text",
      name: "phone",
      slideTitle: "Sign Up",
      text: "And leave your paperwork behind!",
      // text2: "Please enter your email:",
      // keyboard: "email-address",
      keyboard: "phone-pad",
      placeholder: "Enter your Phone Number",
      button: "Get Started",
      text3: "Contact The Net Giver Team"
      // keyboard: "phone-pad",
      // schema: {
      //   phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number is required."),
      // }
    },
    {
      type: "text",
      name: "Number Verification",
      slideTitle: "We need to verify your phone number",
      text: "We just sent a one-time code to",
      // text2: formValues['phone'],
      placeholder: "6-digit code",
      button: "Sign Up",
      text3: "Contact The Net Giver Team"
      // schema: {
      //   username: Yup.string().min(2).max(50).required('Username is required.'),
      // }
    },
    {
      type: "text",
      name: "email",
      slideTitle: "Email",
      text: "Email",
      // text2: formValues['email'],
      placeholder: "6-digit code",
      button: "Next",
      // schema: {
      //   username: Yup.string().min(2).max(50).required('Username is required.'),
      // }
    },
    {
      name: "username",
      slideTitle: "Welcome to Netgiver!",
      text: "We just need to get some info before you get started",
      text2: "Please enter your username:",
      placeholder: "username",
      button: "Next",
      // schema: {
      //   username: Yup.string().min(2).max(50).required('Username is required.'),
      // }
    },
    {
      type: "photo",
      slideTitle: "Create your Profile",
      text: "Tap to add",
      name: 'fullname',
      name2: 'email',
      topComponent: <PhotoInput />,
      placeholder: "Full Name",
      placeholder2: "Email",
      button: "Submit"
    }
  ]

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });


  function Form(slide) {
    var schema = Yup.object().shape(this.schema);
    return <Formik
      onSubmit={(values, formikBag) => {
        formikBag.setSubmitting(false);
        handleNext(values, formikBag)
      }}
      validationSchema={schema}
      initialValues={{
        [this.name]: ""
      }}
      render={props => {
        return slide.call(this, props);
      }}
    />
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        onSubmit={values => console.log(values)}
        validationSchema={SignupSchema}
        initialValues={{ email: '', username: '', phone: '' }}
      >
        <Swiper
          ref={swipeRef}
          style={styles.wrapper}
          showsButtons={false}
          disableNextButton={disabled}
          loop={false}
          buttonWrapperStyle={{ position: "relative", marginVertical: 80, paddingHorizontal: 0 }}
        >
          {pages.map((input, index) => {
            return (
              <View style={styles['slide' + ++index]} key={'slide' + input.id}>
                {input.image ? <Image style={loginStyles.logo} source={require('../../components/Images/ng.png')} /> : null}
                {input.topComponent}
                {input.slideTitle &&
                  <Text style={styles.title}> {input.slideTitle} </Text>
                }
                <Text style={styles.text}> {input.text} </Text>

                <View style={styles.inputContainer}>

                  <Text style={styles.text}> {input.text2} </Text>

                  <TextInput
                    key={input.name + input.id}
                    name={input.name}
                    value={formValues[input.name]}
                    keyboardType={input.keyboard}
                    onChangeText={(text) => onInputChange(input.name, text)}
                    placeholder={input.placeholder}
                    style={styles.input}
                  />

                  {input.name2
                    ? <TextInput
                      key={input.name2 + input.id}
                      name={input.name2}
                      value={formValues[input.name2]}
                      keyboardType={input.keyboard}
                      onChangeText={(text) => onInputChange(input.name2, text)}
                      placeholder={input.placeholder2}
                      style={styles.input}
                    />
                    :
                    null

                  }
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => input.button === "Submit" ? 
                    signUp({
                      variables: {
                        username: formValues.username,
                        email: formValues.email,
                        phone: formValues.phone,
                        password: 'password'
                      }
                    })
                    : 
                    handleNext()
                  }
                  >
                    <Text style={styles.buttonText}>{input.button}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </Swiper>
      </Formik>
    </KeyboardAvoidingView>
  );


}
const styles = StyleSheet.create({
  wrapper: {
  },
  container: { flex: 1 },
  inputContainer: {
    marginTop: -5,
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  slide0: {
    //backgroundColor: '#008000',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },

  slideTitle: {
    fontWeight: 'bold',
  },

  logo: {
    borderWidth: 2,
    position: 'absolute',
    left: 'auto',
    right: 'auto',
    top: '9.15%',
    bottom: '73.91%',

  },

  slide1: {
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },

  slide2: {
    flexDirection: "column",
    marginTop: 100,
  },

  input: {
    width: '100%',
    backgroundColor: '#EDF1F3',
    marginVertical: 20,
    marginBottom: 45,
    paddingVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    color: 'white'
  },
  buttonStyle: {
    padding: 2,
    marginVertical: -20,
    backgroundColor: '#009900',
    alignItems: 'center',
    borderRadius: 4,
    width: '100%',
  },
  btnNext: {
    color: '#009900'
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },

  title: {
    color: '#282424',
    marginTop: '10%',
    fontSize: 22,
    fontWeight: 'bold',

    //marginVertical: 80,
    textAlign: 'center',
    //paddingBottom: 3,
  },
  text: {
    color: '#282424',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderWidth: 6,
    borderRadius: 200 / 2,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
    alignSelf: 'center',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default SignupBp