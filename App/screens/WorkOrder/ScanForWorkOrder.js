import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {doCreateQr} from '../../store/actions/workActions'
import { connect } from 'react-redux';

const ScanForWorkOrder = (props) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(null);

    useEffect(() => {
        getPermissionsAsync();

    }, [hasCameraPermission])

    

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission('granted');
  };


  const handleBarCodeScanned = ({ type, data }) => {
   setScanned(true)
   const mut = `mutation {
    createWorkorder(order: "plumbing", qrcode: ${data}){
      id
      order
      qrcode
    }
  }`
  token = `"${props.token}"`
    props.navigation.navigate('WorkOrderCheck', {qrcode: data});
    // props.doCreateQr(token, mut)
  };
 
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}
      </View>
    );
  }




const mapStateToProps = (state) => ({
    token: state.authReducer.token
  })


export default connect (mapStateToProps, {doCreateQr})(ScanForWorkOrder)