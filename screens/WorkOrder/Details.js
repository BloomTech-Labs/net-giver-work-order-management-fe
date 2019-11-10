import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  
  // Text,
  Alert,
  Image,
  SafeAreaView,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Field, Formik } from "formik";
import { Text } from "native-base";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import { wOForm, wOList, styles } from "../../components/Styles";
import { StackActions, NavigationActions } from "react-navigation";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PictureField } from "../../components/shared/PictureField";
import { CameraField } from "../../components/shared/CameraField";





const Details = ({ navigation }) => {
  const {
    id,
    qrcode,
    detail,
    priority,
    status,
    title,
    user,
    user: { username },
    workorderphoto } = navigation.state.params;

    const [onPressDetails, setOnPressDetails] = useState();
    const [onPressUpdates, setOnPressUpdats] = useState();

  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

    return (
        <ScrollView>

          {/* NAV */}
        <TouchableHighlight 
        underlayColor='#00830B'
        >

          <View style={details.navContainer}>

            {/* NAV DETAILS BUTTON DIV */}
            <View style={[details.navDetailsButton, details.sameNavButtonStyles]}>
              <Text style={[details.navDText, {color: '#00830B'},{fontWeight: "600"}, {fontSize:16}]}>
                Details
              </Text>
            </View>

            <View style={details.navUnderLine1}></View>

            {/* NAV UPDATE BUTTON DIV */}
            <View style={[details.navUpdatesButton, details.sameNavButtonStyles]}>
              <Text style={[{color: '#89898E'}, {fontWeight: "600"}, {fontSize:16}]}>
                Updates
              </Text>
            </View>
        
            <View style={details.navUnderLine2}></View>

          </View>

        </TouchableHighlight>


            {/* IMAGE */}
            <View style={details.imgDiv}>
            {workorderphoto
                      ? <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: workorderphoto.path
                          }}
                        />
                      : <Image
                          style={details.imgUpload}
                          source={{
                            uri: img1
                          }}
                        />}
            </View>

        <View style={ [details.theDetsContainer, {backgroundColor: "#F8F5F4"}] }>
          <View style={details.topDetailsDiv}>

            {/* TITLE */}
            <View style={details.titlePriorityDiv}>
                 <Text style={details.wOTitle}>{title}</Text>

              {/* PRIORITY BOXES */}
              <View style={[
                      {
                        backgroundColor:
                          priority === "Low"
                            ? "#E2F5FC"
                            : priority === "Medium"
                              ? "#FBF2D7"
                              : priority === "High" ? "#FFD3D3" : "#F2F5F7",
                      },
                      details.infoBackground
                    ]}>
                 <Text style={[ {fontWeight: '500'},
                      {
                        color:
                          priority === "Low"
                            ? "#087FFF"
                            : priority === "Medium"
                              ? "#E1AA08"
                              : priority === "High" ? "#FE273A" : "#8B9195",
                      },
                      details.infoText
                    ]}
                  >{priority}</Text>
              </View>
            </View>

            {/* DETAILS */}
            <View style={{paddingBottom: 15}}>
                 <Text>{detail}</Text> 
            </View>

            {/* STATUS */}
              <View style={details.statusDiv1} >
                <View style={details.statusDiv2}> 
                    <Text style={[
                    {
                      color:
                        status === 'Open' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    },
                    details.infoText
                  ]}>
                        Open
                    </Text>
                
                    <Text style={[
                    {
                      color:
                        status === 'Hold' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    },
                    details.infoText
                  ]}>
                        Hold
                    </Text>
                
                    <Text style={[
                    {
                      color:
                        status === 'Working' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    },
                    details.infoText
                  ]}>
                        Working
                    </Text>

                    <Text style={[
                    {
                      color:
                        status === 'Done' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    },
                    details.infoText
                  ]}>
                        Done
                    </Text>
                </View>
              </View>
            </View>

                {/* BOTTOM DETAILS*/}
                <View style={details.bottomDetailsDiv}>
                    
                  <View style={details.iAmALine}>
                      <Text style={details.bottomTitle}>Ticket #</Text>
                      <Text style={details.bottomText}>{qrcode}</Text>
                  </View> 

                  <View style={details.iAmALine}>
                      <Text style={details.bottomTitle}>Created On</Text>
                      <Text style={details.bottomText}>Some Date</Text>
                  </View>  

                  <View style={details.iAmALine}>
                      <Text style={details.bottomTitle}>Assigned To</Text>
                      <Text style={[details.bottomText, details.userRedText]}>{user.username}</Text>
                  </View> 

                  <View style={details.iAmALine}>
                      <Text style={details.bottomTitle}>Created By</Text>
                      <Text style={[details.bottomText, details.userRedText]}>{user.username}</Text>
                  </View> 

                </View>
           </View>

        </ScrollView>                 
    )
}


const details = StyleSheet.create({

  iAmALine: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1, 
    borderBottomColor: '#F8F5F4',
    margin: 5,

    
  },

  sameNavButtonStyles: {
    padding: 13,
    
    
  },

  bottomDetailsDiv: { 
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F5F4", 
    margin: 10,
    borderRadius: 7,
  },

  bottomTitle: {
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,

  },

  navContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  bottomText: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  userRedText: {
    color: 'red'
  },

  wOTitle: {
    fontWeight: '600',
  },

  navLine1: {
    borderBottomWidth: 4,
    borderBottomColor: '#00830B',
    width: 150,
  },

  topDetailsDiv: {
    margin: 25,
  },

  titlePriorityDiv: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 13,
  },

  statusDiv2: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20, 
  },

  

  infoBackground: {
    borderRadius: 7,
    padding: 5,
  },

  imgDiv: {
    width: 375,
    height: 200,
  },

  theDetsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  }
  
  })








export default Details
