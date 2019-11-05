import React, {useState} from 'react'
import {SafeAreaView, Text, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'

const VerCode = (props) => {
    const phone = props.navigation.state.params.phone
    const [ver , setVer] = useState()
    return (
        <SafeAreaView>
            <Text style={su2.header}>We need to verify your phone number</Text>
            <Text style={su2.subHead}>We just sent a one-time code to</Text>
            <Text>{'+1' + phone}</Text>
            <TextInput
            style={su2.input}
            placeholder="6-digit-code"
            keyboardType='number-pad'
            maxLength={6}
            onChangeText={setVer}
            value={ver}
             />
            <TouchableOpacity style={su2.button} onPress={handleSubmit}><Text style={su2.buttonText}>Get Started</Text></TouchableOpacity>
            <Text style={su2.footer}>Contact the Net Giver Team</Text>

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
    },
    subHead:{
        fontSize: 17,
        fontWeight: '600',
    },
    input:{
        backgroundColor: "#edf1f3",
        borderWidth: 1,
        borderColor: "#C5C2C2",
        marginTop:30,
        marginBottom:35,
        width:"90%",
        alignSelf:'center',
        padding: 10,
    },
    button:{
        alignSelf:'center',
        marginBottom:35,
        backgroundColor:'#00830B',
        borderRadius: 4,
        width:"90%",
        padding: 10,

    },
    buttonText:{
        alignSelf:'center',
        color:'white'
    },
    footer:{
        fontSize: 17,
        alignSelf: 'center'
    },


})