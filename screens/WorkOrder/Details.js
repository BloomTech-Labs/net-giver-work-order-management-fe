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
  ActivityIndicator
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

  const img1 =
    "http://placehold.jp/006e13/ffffff/200x250.png?text=Click%20to%20Add%20an%20Image";

    return (
        <ScrollView>

            {/* IMAGE */}
            <View >
            {workorderphoto
                      ? <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: workorderphoto.path
                          }}
                        />
                      : <Image
                          style={wOForm.imgUpload}
                          source={{
                            uri: img1
                          }}
                        />}
            </View>

        <View style={{ backgroundColor: "#F8F5F4" }}>
          <View style={details.topDetailsDiv}>
            {/* TITLE */}
            <View style={details.titlePriorityDiv}>
                 <Text style={details.wOTitle}>{title}</Text>

                 <Text style={[
                    {
                      backgroundColor:
                      status === "Low"
                          ? "#E2F5FC"
                          : status === "Medium"
                            ? "#CBFBCB"
                            : status === "High" ? "#FFED9B" : "#FFD3D3"
                    },
                    wOList.info,
                    wOList.status
                  ]}>{priority}</Text>
            </View>

            {/* DETAILS */}
            <View>
                 <Text>{detail}</Text> 
            </View>

            {/* STATUS */}
              <View>
                    <View >
                        <Text style={[
                      {
                        color:
                            status === "Low"
                            ? "#087FFF"
                            : status === "Medium"
                              ? "#07BD51"
                              : status === "High" ? "#DBA004" : "#FE273A",
                        textAlign: "center",
                        width: "100%"
                      },
                      wOList.infoText
                    ]}
                  >
                    {status}
                  </Text>
                    </View>


                    <View> 
                        <Text>
                            Open
                        </Text>
                    
                        <Text>
                            Hold
                        </Text>
                    
                        <Text>
                            Working
                        </Text>
                    </View>
                </View>
            </View>

                {/* OTHER DETAILS*/}
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

  bottomDetailsDiv: { 
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F5F4", 
    margin: 10,
  },

  bottomTitle: {
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,

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

  topDetailsDiv: {
    margin: 25,
  }
  
  })








export default Details
