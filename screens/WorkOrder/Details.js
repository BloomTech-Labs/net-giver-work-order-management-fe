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

          {/* NAV CONTAINER*/}
        <TouchableHighlight 
        underlayColor='#00830B'
        >

          
          <View style={[details.navContainer, {borderWidth:2}]}>

            {/* NAV DETAILS BUTTON DIV */}
            <View style={[details.navDetailsButton, details.sameNavButtonStyles, {borderWidth:2}]}>
              <Text style={[{textAlign: 'center'}, details.navDText, {color: '#00830B'},{fontWeight: "600"}, {fontSize:16}]}>
                Details
              </Text>
            </View>

            {/* ACTIVE LINE 1 */}
            <View style={details.navUnderLine1}></View>

            {/* NAV UPDATE BUTTON DIV */}
            <View style={[details.navUpdatesButton, details.sameNavButtonStyles, {borderWidth:2}]}>
              <Text style={[{textAlign: 'center'},{color: '#89898E'}, {fontWeight: "600"}, {fontSize:16}]}>
                Updates
              </Text>
            </View>
            
            {/* ACTIVE LINE 2 */}
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

            
    {/* STATUS BUTTON SECTION //////////////////////////////////////////////////// */}
    <View style={details.statusDiv1}>

        {/* OPEN /////////////// */}
        <View style={details.iconCircleDiv}> 
          <View style={[details.iconCircle, {
                        backgroundColor:
                          status === 'Open' 
                            ? "#00830B"
                            : '#D8D8D8' 
                              
                      }, {textAlign: 'center'}]}>  
            <Icon
              color="#FFFFFF"
              type="antdesign"
              name="unlock"
              size={25}
              iconStyle={[details.icon, {margin: 5}]}
          />

              {/* OPEN TEXT */}
              <View style={[details.openTextDiv, {marginTop: 7}]}>
                <Text style={[
                    {
                      color:
                        status === 'Open' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    },
                    details.openText
                  ]}>
                        Open
                    </Text>
                </View>
            </View>

          {/* HOLD ////////////////////// */} 
          <View style={[details.iconCircle, {
                        backgroundColor:
                          status === 'Hold' 
                            ? "#00830B"
                            : '#D8D8D8' 
                              
                      }, {textAlign: 'center'}]}> 
                <Icon
                  color="#FFFFFF"
                  type="antdesign"
                  name="pause"
                  size={25}
                  iconStyle={{margin: 6}}
                />
            

                  {/* HOLD TEXT */}
                  <View style={[details.holdTextDiv, {marginTop: 7}]}>
                  <Text style={[
                    {
                      color:
                        status === 'Hold' 
                          ? "#00830B"
                          : '#89898E'     
                    },
                    {marginLeft: 2},
                    details.holdText
                  ]}>
                        Hold
                    </Text>
              </View>
            </View>

          {/* WORKING ///////////// */}
          <View style={[details.iconCircle, {
                        backgroundColor:
                          status === 'Working' 
                            ? "#00830B"
                            : '#D8D8D8' 
                              
                      }, {textAlign: 'center'}]}>  
            <Icon
              color="#FFFFFF"
              type="antdesign"
              name="sync"
              size={20}
              iconStyle={{margin: 10}}
            />

            {/* WORKING TEXT */}
            <View style={[details.workingTextDiv, {marginTop: 6}]}>
            <Text style={[
                    {
                      color:
                        status === 'Working' 
                          ? "#00830B"
                          : '#89898E' 
                            
                    }, {width: 60} , {marginLeft: -8},
                    details.workingText
                  ]}>
                        Working
                    </Text>
                </View>
            </View>
                    
          {/* DONE /////////////////////// */}
          <View style={[details.iconCircle, {
                        backgroundColor:
                          status === 'Done' 
                            ? "#00830B"
                            : '#D8D8D8' 
                              
                    }, {textAlign: 'center'}]}>

              <Icon
                color="#FFFFFF"
                type="antdesign"
                name="lock"
                size={25}
                iconStyle={{margin: 6}}
                      
              />

               {/* DONE TEXT */}
               <View style={[details.workingTextDiv, {marginTop: 7}]}>

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
                <TouchableOpacity style={details.editButton}><Text style={[{textAlign: 'center'}, {color: 'white'}]}>Edit</Text></TouchableOpacity>
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

  navDetailsButton: {
    paddingLeft: 15,
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
    justifyContent: 'space-around',
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

  // navLine1: {
  //   borderBottomWidth: 4,
  //   borderBottomColor: '#00830B',
  //   width: 150,
  // },

  topDetailsDiv: {
    margin: 25,
  },

  titlePriorityDiv: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 13,
  },

  statusDiv1: {
    marginLeft: -20,
    marginTop: 15, 
  },

  

  infoBackground: {
    borderRadius: 7,
    padding: 5,
  },

  // imgDiv: {
  //   width: 375,
  //   height: 200,
  // },

  theDetsContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },

  iconCircleDiv: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop:20 , 
  },

  iconCircle: {
    borderRadius: 50,
    width: 40,
    height: 40,
  
  },

  editButton: {
    backgroundColor: '#00830B',
    paddingVertical: 10,
    borderRadius: 20,
    width: "35%",
    alignSelf: "center",
    justifyContent: "center",
    margin: 15
  }

  
  })








export default Details
