import React, { useState, useRef } from 'react'
// import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'
import Swiper from 'react-native-swiper'
// import { doSignup} from "../store/actions/authActions";
import * as Yup from 'yup'
import Camera from '../../components/camera/Camera'
//To-Do
//  Input validation -- functions built out just need to implement
//  Data sent and received by server - need to build after signup process
//  Add all required fields (role, picture, authId??)
//  Formatting and styling
const Signup = props => {
    // Need to clean up a lot of this code - was plowing ahead towards a solution & mvp.
    const [user, setUser] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [err, setErr] = useState()
    const [current, setCurrent] = useState(0)
    // const dispatch = useDispatch();
    const onInputChange = (name, text) => {
        const updatedUser = { ...user, [name]: text }
        setUser(updatedUser)
        console.log(user)
        // setUser({ ...user, [name]: text})
    }
    const handleSubmit = () => {
        console.log('user', user)
        const { username, email, phone } = user
        const password = 123456 //temp password for testing
        const newUser = `mutation { signUp( username: "${username}", password: "${password}", email: "${email}", phone: "${phone}" ) { token user {id} } }`
        // dispatch(doSignup(newUser))
    }
    const swipeRef = useRef()
    const pages = [
        {
            slideTitle: 'Welcome to Netgiver!',
            text: 'We just need to get some info before you get started',
            text2: 'Please enter your email:',
            name: 'email',
            keyboard: 'email-address',
            placeholder: 'Email',
        },
        {
            slideTitle: 'Welcome to Netgiver!',
            text: 'We just need to get some info before you get started',
            text2: 'Please enter your username:',
            name: 'username',
            placeholder: 'username',
        },
        {
            slideTitle: 'Welcome to Netgiver!',
            text: '',
            text2: 'Please enter your phone number:',
            name: 'phone',
            placeholder: 'Phone Number',
            keyboard: 'phone-pad',
        },
        {
            type: 'photo',
        },
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
    })
    const LastSlide = () => {
        return (
            <View style={styles.slide4}>
                <Text style={styles.title}>Phone</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>
                        Please select a profile photo:
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() =>
                            props.navigation.navigate('Camera', {
                                from: 'Signup',
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Use the Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const handleClick = () => {
        swipeRef.current.scrollBy(1, true)
        setCurrent(current + 1)
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                    buttonWrapperStyle={{
                        position: 'relative',
                        marginVertical: 80,
                        paddingHorizontal: 0,
                    }}
                >
                    {pages.map((input, index) => {
                        if (input.type === 'photo') {
                            return <LastSlide />
                        } else
                            return (
                                <View
                                    style={styles['slide' + ++index]}
                                    key={'slide' + input.id}
                                >
                                    <Text style={styles.title}>
                                        {' '}
                                        {input.slideTitle}{' '}
                                    </Text>
                                    <Text style={styles.text}>
                                        {' '}
                                        {input.text}{' '}
                                    </Text>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.text}>
                                            {' '}
                                            {input.text2}{' '}
                                        </Text>
                                        <TextInput
                                            key={input.name + input.id}
                                            name={input.name}
                                            value={user[input.name]}
                                            keyboardType={input.keyboard}
                                            onChangeText={text =>
                                                onInputChange(input.name, text)
                                            }
                                            placeholder={input.placeholder}
                                            style={styles.input}
                                        />
                                        <TouchableOpacity
                                            style={styles.buttonStyle}
                                            onPress={() => handleClick()}
                                        >
                                            <Text style={styles.buttonText}>
                                                Next
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                    })}
                </Swiper>
            </Formik>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    container: { flex: 1 },
    inputContainer: {
        marginTop: 50,
        width: '100%',
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#EDF1F3',
        marginVertical: 30,
        paddingVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonText: {
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        color: 'white',
    },
    buttonStyle: {
        padding: 2,
        backgroundColor: '#006E13',
        alignItems: 'center',
        borderRadius: 4,
        width: '100%',
    },
    btnNext: {
        color: 'green',
    },
    slide1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: '#282424',
        fontSize: 26,

        marginTop: '10%',
        textAlign: 'center',
        paddingBottom: 3,
    },
    text: {
        color: '#282424',
        fontSize: 16,
        textAlign: 'center',
    },
})
export default Signup
