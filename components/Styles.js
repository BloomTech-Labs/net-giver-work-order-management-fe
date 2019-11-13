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
export const wOForm = StyleSheet.create({
  imgCard: {
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    marginBottom: 10
  },
  imgCardTop: { marginTop: 10, marginBottom: 10 },
  imgCardBot: { marginTop: 10 },
  touchImage: {},
  imgUpload: {
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10
    // fontFamily: "IBMPlexSans-Regular"
  },
  statusView: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "flex-start",
    justifyContent: "space-between",
    padding: 0,
    borderWidth: 0,
    // borderBottomWidth: 1,
    alignItems: "center",
    padding: 5
  },
  statusText: {
    textAlign: "left",
    width: "100%",
    fontFamily: "IBMPlexSans-Regular"
  },
  statusDiv: {
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginTop: 0,
    borderRadius: 0
  },
  statusButton: { flexDirection: "column" },
  statusButtons: {
    backgroundColor: "#f4f3f3",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    margin: 3,
    flexDirection: "column",
    width: 80
  },
  statusButtonsText: {
    color: "#89898E",
    fontFamily: "IBMPlexSans-Regular",
    textAlign: "center",
    fontSize: 14
  },
  statusButtonsActive: {
    backgroundColor: "#009900"
  },
  submitButton: {
    backgroundColor: "#009900"
  },
  statusButtonsTextActive: {
    color: "white",
    fontFamily: "IBMPlexSans-Regular"
  },
  priorityDiv: {
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    borderWidth: 0,
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginTop: 0,
    borderRadius: 0,
    justifyContent: "space-between"
  },
  priorityButtons: {
    backgroundColor: "#f4f3f3",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    margin: 3,
    height: 55,
    width: 80
  },
  priorityButtonsText: {
    color: "#89898E",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "IBMPlexSans-Regular",
    marginTop: "auto",
    marginBottom: "auto"
  },

  priorityButtonsActive: {
    backgroundColor: "#009900",
    width: "23%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C5C2C2",
    padding: 5,
    height: 53
  },
  priorityButtonsTextActive: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "IBMPlexSans-Regular"
  },
  hidden: {
    display: "none",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#006E13",
    borderWidth: 2,
    borderColor: "#EDF1F3",
    width: "96%",
    alignSelf: "center",
    justifyContent: "center"
  },
  textInput: {
    marginTop: -15,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#ffffff",
    borderColor: "#C5C2C2",
    fontFamily: "IBMPlexSans-Regular",

    width: "102%",
    alignSelf: "center",
    padding: 10
  },
  textInput1: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#ffffff",
    fontFamily: "IBMPlexSans-Regular",

    borderColor: "#C5C2C2",
    width: "102%",
    alignSelf: "center",
    padding: 10,
    height: 90,
    textAlignVertical: "top"
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
    backgroundColor: "#edf1f3",
    borderWidth: 1,
    borderColor: "#C5C2C2",
    marginTop: 30,
    marginBottom: 35,
    width: "90%",
    alignSelf: "center",
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
export const cbc = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textMain: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontFamily: "IBMPlexSans-Regular"
  },
  button: {
    backgroundColor: "#009900",
    borderWidth: 2,
    borderColor: "#EDF1F3",
    alignSelf: "center",
    borderRadius: 4,
    width: "96%",
    fontFamily: "IBMPlexSans-Regular"
  },
  buttonText: {
    fontFamily: "IBMPlexSans-Regular",
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10
  }
});
