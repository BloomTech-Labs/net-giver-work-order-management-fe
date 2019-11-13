import React, { useState } from 'react'
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native'
import {topBtn} from '../../assets/style/components/buttons'

const VerCode = props => {
console.log("TCL: props", props)
    const phone = props.navigation.getParam("phone", "NO PHONE")
    const [user, setUser] = useState(props.navigation.getParam("user", "NO USER"))
    console.log('user', user)
    const [ver, setVer] = useState()
    handleSubmit = () => {
        if (ver === undefined) {
            alert('Please check your verification code')
        } else if (ver.length != 6) {
            alert('Please check your verification code')
        } else {
            props.navigation.navigate('P3', { user: user, verCode: ver, phone:phone })
        }
    }
    return (
        <SafeAreaView>
            <Text style={su2.header}>We need to verify your phone number</Text>
            <Text style={su2.subHead}>We just sent a one-time code to</Text>
            <Text>{'+1' + phone}</Text>
            <TextInput
                style={su2.input}
                placeholder="6-digit-code"
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={setVer}
                value={ver}
            />
            <TouchableOpacity style={topBtn.fullWidthBtn} onPress={handleSubmit}>
                <Text style={topBtn.btnFont}>Sign Up</Text>
            </TouchableOpacity>
            <Text
                onPress={() => props.navigation.navigate('Contact')}
                style={su2.footer}
            >
                Contact the Net Giver Team
            </Text>
        </SafeAreaView>
    )
}

export default VerCode
const su2 = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 15,
        fontFamily: 'IBMPlexSans-Regular',
    },
    subHead: {
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'IBMPlexSans-Regular',
    },
    input: {
        backgroundColor: '#edf1f3',
        borderWidth: 1,
        borderColor: '#C5C2C2',
        marginTop: 30,
        marginBottom: 35,
        width: '90%',
        fontFamily: 'IBMPlexSans-Regular',
        alignSelf: 'center',
        padding: 10,
    },
    button: {
        alignSelf: 'center',
        marginBottom: 35,
        backgroundColor: '#00830B',
        borderRadius: 4,
        width: '90%',
        padding: 10,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'IBMPlexSans-Regular',
        fontSize:17,

    },
    footer: {
        fontSize: 17,
        fontFamily: 'IBMPlexSans-Regular',
        alignSelf: 'center',
        marginTop:35
    },
})
