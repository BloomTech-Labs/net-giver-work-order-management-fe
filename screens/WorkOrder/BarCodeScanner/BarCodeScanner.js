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

const QR_LOOKUP = gql`
  mutation Qrlookup($qrcode: String!) {
    qrlookup(qrcode: $qrcode) {
      found
      id
      qrcode
    }
  }
`;

const BarcodeScanner = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState("000006");
  const [qrlookup, { loading, error, data: qrlookupdata }] = useMutation(
    QR_LOOKUP,
    {}
  );

  useEffect(() => {
    const getPermissionsAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission("granted");
    };
    getPermissionsAsync();
  }, []);
  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setCode(data);
    await qrlookup({
      variables: { qrcode: data },
      fetchPolicy: "no-cache"
    });
    return data;
  };

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Loading</Text>
      </SafeAreaView>
    );

  //add a workorder without a qr code
  const viewExisting = () => {
    const genQr = "n7330";
    handleBarCodeScanned({ data: genQr });
  };
  const addNew = () => {
    const genQr = "n" + Date.now().toString().slice(7, 11);
    handleBarCodeScanned({ data: genQr });
  };
  {
    qrlookupdata && navigation.navigate("BarCodeChecker", { ...qrlookupdata });
    // qrlookupdata.qrlookup.found
    //   ? navigation.push("Details", { id: qrlookupdata.qrlookup.id })
    //   : navigation.navigate("CheckBarCode", {
    //       qrData: qrlookupdata.qrlookup.qrcode
    //     });
  }
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
            <TouchableOpacity style={styles.customBtnBG} onPress={viewExisting}>
              <Text style={styles.customBtnText}>n7330</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customBtnBG} onPress={addNew}>
              <Text style={styles.customBtnText}>New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BarCodeScanner>
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
