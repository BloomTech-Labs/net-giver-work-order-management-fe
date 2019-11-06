import React, {useState} from 'react'
import {SafeAreaView, Text, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'
const Phone = (props) => {
    const [phone, setPhone] = useState();
    handleSubmit = () => {
        if(phone === undefined){
            alert('Please Enter a Valid Phone Number')
        } else if (phone.length != 10) {
            alert('Please Enter a Valid Phone Number')

        } 
        else {
            props.navigation.navigate('P2', {phone: phone})
        }
    }
    return (
        <SafeAreaView>
            <Image         
            style={su1.logo}
            source={require("../../components/Images/ng.png")} />
            <Text style={su1.header}>Sign Up</Text>
            <Text style={su1.subHead}>And leave your paperwork behind!</Text>
            <TextInput
            style={su1.input}
            placeholder="Enter your Phone Number"
            keyboardType='phone-pad'
            autoCompleteType='tel'
            maxLength={10}
            onChangeText={setPhone}
            value={phone}
             />
            <TouchableOpacity style={su1.button} onPress={handleSubmit}><Text style={su1.buttonText}>Get Started</Text></TouchableOpacity>
            <Text onPress={() => props.navigation.navigate('Contact')} style={su1.subHead}>Contact the Net Giver Team</Text>

        </SafeAreaView>
    )
}
export default Phone
const su1 = StyleSheet.create({
    logo: {
        width: 108,
        alignSelf:'center',
        marginTop: 50,
        marginBottom: 35,

    },
    header: {
        fontSize: 24,
        alignSelf: 'center',
        marginBottom: 15,
        fontFamily: "IBMPlexSans-Regular",
    },
    subHead:{
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: "IBMPlexSans-Regular",
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
        fontFamily: "IBMPlexSans-Regular",
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
        color:'white',
        fontFamily: "IBMPlexSans-Regular",
    },


})
  