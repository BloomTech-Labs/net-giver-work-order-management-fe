import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native'

const Email = props => {
    const { navigation } = props
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [photo, setPhoto] = useState(navigation.getParam('photo', 'nophoto'))
    const [photouri, setPhotouri] = useState(photo.uri)
    const placeholderImg =
        'http://placehold.jp/006e13/ffffff/200x200.png?text=Click%20to%20Add%20an%20Image'
    handleSubmit = () => {
console.log(props)    }
    toCamera = () => {
        props.navigation.navigate('CameraModule', { from: 'P3' })
    }
    return (
        <SafeAreaView>
            <Text style={su3.header}>Create your Profile</Text>
            <Text style={su3.subHead}>
                So your colleagues can recognize you!
            </Text>

            <TouchableOpacity style={su3.avatar} onPress={toCamera}>
            {photouri
                ? <Image
                    style={su3.image}
                    source={{
                      uri: photouri
                    }}
                  />
                : <Image
                    style={su3.image}
                    source={{
                      uri: placeholderImg
                    }}
                  />}
                {/* <Image style={su3.image} source={{ uri: photouri }} /> */}
                <Text style={su3.avatarText}>Tap to add</Text>
            </TouchableOpacity>
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
                value={email}
            />
            <TouchableOpacity style={su3.button} onPress={handleSubmit}>
                <Text style={su3.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <View style={su3.tosBox}>
                <Text style={su3.tosFont}>By pressing "Next" above, you agree to our <Text onPress={() => navigation.navigate('TOS')} style={su3.underline}>terms of service </Text>and <Text style={su3.underline} onPress={() => navigation.navigate('PP')}>privacy policy.</Text></Text>
            </View>
            <Text onPress={() => navigation.navigate('Contact')} style={su3.subHead}>Contact the Net Giver Team</Text>
        </SafeAreaView>
    )
}

export default Email
const su3 = StyleSheet.create({
    header: {
        fontSize: 24,
        alignSelf: 'center',
        fontFamily: "IBMPlexSans-Regular",
        marginTop: 15,
        marginBottom:20,
        fontWeight:'bold',
    },
    subHead: {
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: "IBMPlexSans-Regular",
        marginBottom:50,
    },
    avatar: {
        alignSelf: 'center',
    },
    avatarText: {
        alignSelf: 'center',
        fontFamily: "IBMPlexSans-Regular",
    },

    image: {
        width: 200,
        height: 200,
        borderRadius:100,
    },
    input: {
        backgroundColor: '#edf1f3',
        borderWidth: 1,
        borderColor: '#C5C2C2',
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        fontFamily: "IBMPlexSans-Regular",
    },
    button: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#00830B',
        borderRadius: 4,
        width: '90%',
        padding: 10,
        marginTop: 30,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: "IBMPlexSans-Regular",
    },
    tosBox:{
        marginBottom: 40,
    },
    tosFont:{
        fontSize: 15,
        fontFamily: "IBMPlexSans-Regular",
    },
    underline:{
        textDecorationLine:'underline',
    },
})
