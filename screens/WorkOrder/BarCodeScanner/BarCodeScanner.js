import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import gql from "graphql-tag";
import {
  useApolloClient,
  useMutation,
  useLazyQuery
} from "@apollo/react-hooks";
// import { CHECK_FOR_WORKORDER } from "../../../context/resolvers";

const CHECK_FOR_WORKORDER = gql`
  query workorder($qrcode: String) {
    workorder(qrcode: $qrcode) {
      id
      detail
      createdAt
      qrcode
      priority
      status
      title
      user {
        username
      }
      workorderphotos {
        path
      }
    }
  }
`;

const BarcodeScanner = props => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setscanned] = useState(false);
  const [qrcode, setQrcode] = useState(null);
  const [code, setCode] = useState(null);
  const [getQrcode, { loading, data }] = useLazyQuery(CHECK_FOR_WORKORDER, {
    onCompleted({ workorder }) {
      if (!workorder) {
        props.navigation.navigate("CheckBarCode", {
          qrData: qrcode
        });
      } else {
        props.navigation.navigate("EditWorkOrder", {
          wo: workorder
        });
      }
    }
  });

  useEffect(
    () => {
      const getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasCameraPermission("granted");
      };
      getPermissionsAsync();
    },
    [hasCameraPermission]
  );
  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ data }) => {
    console.log(`handleBarCodeScanned`);
    setscanned(true);
    setQrcode(data);
    getQrcode({ variables: { qrcode: data } });
  };

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Loading</Text>
      </SafeAreaView>
    );

  //add a workorder without a qr code
  const addWithoutQr = () => {
    console.log(`addWithoutQr`);
    var genQr = "n" + Date.now().toString().slice(7, 11);
    // var genQr = "n7330";
    setQrcode(genQr);
    getQrcode({ variables: { qrcode: genQr } });
  };

  return (
    // <SafeAreaView style={styles.container}>
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, , styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <View style={styles.fixToText}>
            <TouchableOpacity style={styles.customBtnBG} onPress={addWithoutQr}>
              <Text style={styles.customBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BarCodeScanner>

      {scanned &&
        <Button title={"Tap to Scan Again"} onPress={setscanned(false)} />}
    </SafeAreaView>
    //  </SafeAreaView>
  );
};
const opacity = "rgba(0, 0, 0, .6)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row"
  },
  layerLeft: {
    flex: 4,
    backgroundColor: opacity
  },
  focused: {
    flex: 15
  },
  layerRight: {
    flex: 4,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 180,
    marginRight: 20
  },
  customBtnText: {
    fontSize: 40,
    fontWeight: "400",
    color: "#fff"
  },

  /* Here style the background of your button */
  customBtnBG: {
    backgroundColor: "#007aff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50
  }
});

export default BarcodeScanner;

//SD 10/16/19
