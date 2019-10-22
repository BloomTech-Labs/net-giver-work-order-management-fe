import React, { useState, useEffect } from 'react'
import { Button, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
const GetImage = props => {
    const [image, setImage] = useState(null)
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Button
                title="Pick an image from camera roll"
                onPress={_pickImage}
            />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}
        </View>
    )
}
// useEffect(() => {
//     getPermissionAsync();

// }, [])

const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!')
        }
    }
}
const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
    })
    console.log(result)
    if (!result.cancelled) {
        setImage(result.uri)
    }
}
export default GetImage