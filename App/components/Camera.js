import React, { useState, useEffect, useRef }  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler,
  ImageBackground,
  Dimensions,
  Alert,
  Vibration
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


  const AppCamera = (props) => {

  const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraTypes.back);
  const [flashMode, setFlashMode] = useState(CameraFlashModes.off);

  const [uri, setUri] = useState(null);
  const [photoConfirm, setPhotoConfirm] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();

    if (props) {// Need to check if device is android and from prop is present.
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    } 
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission("granted");
  };

  useEffect(() => {
    setPhotoConfirm(true)
    console.log(photoConfirm)
  }, [uri]);


  // Button Handlers
  takePicture = async() => {
    console.log('pic')
    if (cameraRef) {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setUri(data.base64)
    }
};

  const handleSubmit = () => {
  }

  const handleBackButton = () => {
    props.navigation.goBack(null);
  };

  const CameraView = () => {
    //Determine whether to display camera or photo just taken.
    return (
      <View style={styles.cameraContainer}>
        {uri ?
          <ImageBackground
            // style={{ width: "100%", height: "100%" }}
            style={styles.preview}
            source={{ uri: 'data:image/jpeg;base64,' + uri }}>
          </ImageBackground>
        :
          <Camera 
            ref={cameraRef}
            style={{ flex: 1, justifyContent: 'flex-end' }}
            type={cameraType} />
        }
      </View>
    )
  }

  const SwitchCameraButton = () => {
    return (
      <TouchableOpacity
      style={styles.button}
      onPress={() => setCameraType( cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back )}>
        <Ionicons
          name="md-reverse-camera"
          color="white"
          size={30}
        />
      </TouchableOpacity>
    )
  }

  const FlashButton = () => {
    return (
      <TouchableOpacity style={[styles.button, styles.flash]} onPress={() => setFlashMode( 
        flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on 
      )}>
        <Ionicons
          name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'}
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
            <SwitchCameraButton />
        </View>
    );
  }

  const CaptureButton = () =>{
    return (
      <TouchableOpacity style={styles.captureButtonContainer} onPress={takePicture}>
        <View style={styles.captureBtn}></View>
      </TouchableOpacity>
    )
  }

  const ContentButtons = () =>{
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

  const BottomButtons  = () =>{
    return (
      <View style={styles.bottomButtons}>
        {uri
        ? <ContentButtons />
        : <CaptureButton />

        }
      </View>
    )

  }

  return (
  <View style={styles.container}>
    {hasCameraPermission === null 
      ? ( <View /> )
      : hasCameraPermission === false
      ? ( <Text> No access to camera </Text> )
      : (
          <View style={{ flex: 1, alignSelf: 'stretch',}}>
            <TopButtons />
            <CameraView />
            <BottomButtons />
          </View>
      )
    }
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
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
    flex: .5,
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
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button:{
    padding: 10, 
  },
  flash: {
    // alignSelf: 'flex-start',
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 6,
    borderRadius: 60,
    borderColor: "lightgray",
    backgroundColor: "white",
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
    color: 'white'
  },
});

export default AppCamera
