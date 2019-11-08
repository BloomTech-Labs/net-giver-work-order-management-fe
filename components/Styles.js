import React from "react";
import { StyleSheet } from "react-native";
const plex = "fontFamily: 'IBMPlexSans-Regular'";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#006E13",
    borderWidth: 2,
    borderColor: "#EDF1F3",
    //   alignSelf: "stretch",
    width: "96%",
    fontFamily: "IBMPlexSans-Regular"
  },
  loginTextInput: {
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: "#EDF1F3",
    borderWidth: 2,
    borderColor: "#C5C2C2",
    // box-sizing: border-box;
    borderRadius: 4,
    // alignSelf: "stretch",
    width: "95%",
    padding: 10
  },
  marginTop: {
    marginTop: 30
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  link: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#000",
    margin: 5,
    // fontSize: 30,
    height: 40
  }
});

export const wOList = StyleSheet.create({
  card: {
    width: "100%",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 4,
    paddingLeft: 9,
    paddingRight: 14,
    paddingTop: 13,
    paddingBottom: 31,
    alignSelf: "center",
    flexDirection: "row"
  },
  info: {
    borderRadius: 4,
    height: 20
  },
  infoText: {
    fontSize: 14,
    textAlign: "center"
  },
  status: {
    width: 84
  },
  priority: {
    width: 40,
    marginLeft: 5
  },
  qr: {
    width: 65,
    color: "#8B9195",
    backgroundColor: "#F2F5F7"
  },

  cardMiddle: {
    //width: 160,
    flex: 1
    //paddingRight: 5,
  },

  qrPriority: {
    flexDirection: "row",
    marginTop: 12,
    marginLeft: "auto",
    alignSelf: "flex-end"
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    lineHeight: 22
  },
  cardSubContent: {
    flexDirection: "column"
  },
  cardLeft: {
    width: "auto"
  },
  cardRight: {
    alignItems: "flex-end",
    marginLeft: "auto"
  },
  image: {
    flex: 1,
    flexWrap: "wrap",
    width: 64,
    height: 64,
    borderRadius: 4,
    marginRight: 22
  },
  title: {
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 1
  }
});



export const loginStyles = StyleSheet.create({
  //LOGO CONTAINER -- GET STYLES FROM FIGMA 10/25/2019 SD
  logo: {
    borderWidth: 2,
    position: "absolute",
    left: "auto",
    right: "auto",
    top: "9.15%",
    bottom: "73.91%"
    // width:222,
  },
  header: {
    position: "absolute",
    left: "38.93%",
    right: "39.2%",
    top: "30.28%",
    bottom: "60.62%",
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 24,
    // lineHeight: 25,
    textAlign: "center",
    letterSpacing: -0.165,
    color: "black"
  },
  subHeader: {
    position: "absolute",
    left: "14.67%",
    right: "14.67%",
    top: "37.93%",
    bottom: "57.97%",
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 17,
    lineHeight: 16,
    textAlign: "center",
    // letterSpacing: -0.165,
    color: "black"
  },
  loginTextInput: {
    position: "absolute",
    left: "4.27%",
    right: "4.27%",
    top: "45.28%",
    bottom: "46.48%",
    color: "black",
    backgroundColor: "#EDF1F3",
    borderWidth: 1,
    // box-sizing: border-box,
    borderRadius: 4,
    padding: 10,
    fontFamily: "IBMPlexSans-Regular"
  },
  signIn: {
    position: "absolute",
    left: "4.27%",
    right: "4.27%",
    top: "58.17%",
    bottom: "35.08%",
    borderColor: "black",
    backgroundColor: "#00830B",
    borderWidth: 1,
    // boxSizing: "border-box",
    borderRadius: 4
  },
  signUp: {
    position: "absolute",
    left: "4.27%",
    right: "4.27%",
    top: "72.17%",
    bottom: "25.08%",
    borderColor: "black",
    backgroundColor: "#00830B",
    borderWidth: 1,
    borderColor: "#EDF1F3",
    // boxSizing: "border-box",
    borderRadius: 4
  },
  buttonHeader: {
    position: "absolute",
    left: "auto",
    right: "auto",
    top: "67.17%",
    bottom: "25.08%"
  },
  buttonText: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 17,
    // lineHeight: 14,
    marginRight: "auto",
    marginLeft: "auto",
    color: "#FFFFFF"
  },
  footerText: {
    position: "absolute",
    left: "auto",
    right: "auto",
    top: "85.41%",
    bottom: "10.49%",
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 17
    // fontWeight: "500",
  }
});
