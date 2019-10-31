import React, { useState, useEffect, useRef } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    BackHandler,
    ImageBackground,
    Dimensions,
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'

// How this component works:
// (1) Check camera permissions -- if granted move on, if not request them.
// (2) Sub-component layout
// +-----------------------------------+
// |  TopButtons                       |
// |                                   |
// |  +---------+    +--------------+  |
// |  FlashButton    CameraTypeButton  |
// |  +---------+    +--------------+  |
// |                                   |
// +-----------------------------------+
// |  CameraView                       |
// |                                   |
// |       +----+      +-------+       |
// |       Camera--OR--ViewImage       |
// |       +----+      +-------+       |
// |                                   |
// |                                   |
// +-----------------------------------+
// |  BottomButtons                    |
// |                                   |
// | +-----------+      +------------+ |
// | CaptureButton--OR--ContentButtons |
// | +-----------+      +------------+ |
// |                                   |
// +-----------------------------------+
// (3) Check to see if 'uri' is set in state:
//      (a) 'uri' = null => render Camera
//      (b) !'uri' = null => render ViewImage
// (4) Camera buttons
//      (a) TopButtons: FlashButton & CameraType (front or back)
//      (b) BottomButtons: CaptureButton
// (4) CaptureButton calls async function to take photo
// (5) Base64 code of photo is returned & set to 'uri' state
// (6) This triggers the conditional at step 3 above - ViewImage is rendered
// (7) ViewImage buttons
//      (a) TopButtons: None
//      (b) BottomButtons: Done (accept photo) & Cancel (setUri(null) -> return to Camera)
// (8) User returned to component they were at previously
// (9) TODO -- need to return photo to prior component or send off to server
// (10) TODO -- return ios user to previous component

const AppCamera = props => {
    const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [cameraType, setCameraType] = useState(CameraTypes.back)
    const [flashMode, setFlashMode] = useState(CameraFlashModes.off)

    //Base64 of captured photo
    const [uri, setUri] = useState(null)

    // May not need anymore - was work around for async issues
    const [photoConfirm, setPhotoConfirm] = useState(false)

    //Reference to camera component
    const cameraRef = useRef(null)

    useEffect(() => {
        requestCameraPermission()
        // Event listener for android hardware back button
        if (props) {
            // Need to check if device is android and from prop is present.
            BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        }
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton
            )
        }
    }, [])

    const requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setHasCameraPermission('granted')
    }

    useEffect(() => {
        setPhotoConfirm(true)
    }, [uri])

    // Button Handlers
    takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.7 }
            const data = await cameraRef.current.takePictureAsync(options)
            setUri(data.uri)
        }
    }
    const handleSubmit = () => {
        if (props.navigation.state.params.from === 'Signup') {
            console.log(props.navigation.state.params.callback)
            props.navigation.state.params.callback(uri)
            props.navigation.goBack(null)
        } else if (props.navigation.state.params.from === 'NewWorkOrder') {
            props.navigation.navigate('NewWorkOrder', { uri: uri })
        }
    }

    const handleBackButton = () => {
        props.navigation.goBack(null)
    }

    // Sub-components
    const CameraView = () => {
        //Determine whether to display camera or photo just taken.
        return (
            <View style={styles.cameraContainer}>
                {uri ? (
                    <ImageBackground
                        style={styles.preview}
                        source={{ uri: uri }}
                    ></ImageBackground>
                ) : (
                    <Camera
                        ref={cameraRef}
                        style={{ flex: 1, justifyContent: 'flex-end' }}
                        type={cameraType}
                    />
                )}
            </View>
        )
    }

    const CameraTypeButton = () => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    setCameraType(
                        cameraType === CameraTypes.back
                            ? CameraTypes.front
                            : CameraTypes.back
                    )
                }
            >
                <Ionicons name="md-reverse-camera" color="white" size={30} />
            </TouchableOpacity>
        )
    }

    const FlashButton = () => {
        return (
            <TouchableOpacity
                style={[styles.button, styles.flash]}
                onPress={() =>
                    setFlashMode(
                        flashMode === CameraFlashModes.on
                            ? CameraFlashModes.off
                            : CameraFlashModes.on
                    )
                }
            >
                <Ionicons
                    name={
                        flashMode == CameraFlashModes.on
                            ? 'md-flash'
                            : 'md-flash-off'
                    }
                    color="white"
                    size={25}
                />
            </TouchableOpacity>
        )
    }

    const TopButtons = () => {
        return (
            <View style={styles.topButtons}>
                <FlashButton />
                <CameraTypeButton />
            </View>
        )
    }

    const CaptureButton = () => {
        return (
            <TouchableOpacity
                style={styles.captureButtonContainer}
                onPress={takePicture}
            >
                <View style={styles.captureBtn}></View>
            </TouchableOpacity>
        )
    }

    const ContentButtons = () => {
        return (
            <>
                <TouchableOpacity onPress={() => setUri(null)}>
                    <Text style={styles.previewButttons}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text style={styles.previewButttons}>Done</Text>
                </TouchableOpacity>
            </>
        )
    }

    const BottomButtons = () => {
        return (
            <View style={styles.bottomButtons}>
                {uri ? <ContentButtons /> : <CaptureButton />}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {hasCameraPermission === null ? (
                <View />
            ) : hasCameraPermission === false ? (
                <Text> No access to camera </Text>
            ) : (
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <TopButtons />
                    <CameraView />
                    <BottomButtons />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cameraContainer: {
        flex: 6,
        flexDirection: 'column',
    },
    topButtons: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 2,
        paddingHorizontal: 6,
        backgroundColor: 'black',
    },
    bottomButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    button: {
        padding: 10,
    },
    flash: {
        // alignSelf: 'flex-start',
    },
    captureButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 6,
        borderRadius: 60,
        borderColor: 'lightgray',
        backgroundColor: 'white',
    },
    preview: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        // marginVertical: 20
    },
    previewButttons: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
        color: 'white',
    },
})

export default AppCamera
