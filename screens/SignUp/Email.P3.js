import React, {useState} from 'react'
import {SafeAreaView, Text, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'

const Email = (props) => {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const placeholderImg = "http://placehold.jp/006e13/ffffff/200x200.png?text=Click%20to%20Add%20an%20Image";
    handleSubmit = () => {
            props.navigation.navigate('P2', {phone: phone, verCode:ver})
    }
    return (
        <SafeAreaView>
            <Text style={su3.header}>Create your Profile</Text>
            <Text style={su3.subHead}>So your colleagues can recognize you!</Text>
            <Image style={su3.image} source={{uri : placeholderImg}}/>
            <TouchableOpacity><Text>Tap to add</Text></TouchableOpacity>
            <TextInput
            style={su3.input}
            placeholder="UserName"
            onChangeText={setUserName}
            value={userName}
             />
             <TextInput
             style={su3.input}
             placeholder="Email"
             onChangeText={setEmail}
             value={email} />
            <TouchableOpacity style={su3.button} onPress={handleSubmit}><Text style={su3.buttonText}>Get Started</Text></TouchableOpacity>
            <Text style={su3.subHead}>Contact the Net Giver Team</Text>

        </SafeAreaView>
    )
}

export default Email
const su3 = StyleSheet.create({
    header: {
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 15,
    },
    subHead:{
        fontSize: 17,
        alignSelf: 'center',
    },
    image:{
        width: 200,
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


})
  