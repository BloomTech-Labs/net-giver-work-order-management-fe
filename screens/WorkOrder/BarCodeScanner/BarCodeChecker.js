import React, { useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const BarCodeChecker = ({ navigation }) => {
  //const { qrlookup } = navigation.getParam("qrlookup", "errr");
  const [qrlookup, setQrlookup] = useState(
    navigation.getParam("qrlookup", "errr")
  );
  console.log(qrlookup);
  // CHECKS TO SEE IF THERE IS A TOKEN IF NOT IT WILL SEND YOU BACK TO THE LOGINVERIFY PAGE TO REVIERIFY YOUR TEXT CODE 10/24/2019 SD
  if (qrlookup.id) {
    navigation.push("Details", { id: qrlookup.id });
  } else {
    navigation.navigate("CheckBarCode", {
      qrData: qrlookup.qrcode
    });
  }
  return (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};
export default BarCodeChecker;
