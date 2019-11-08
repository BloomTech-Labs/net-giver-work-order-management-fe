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
            <View>
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

            {/* BUTTONS */}
            <View >
                    <View >
                        <Text>Status</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            >
                            
                            <Text>
                                Not Started
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                In Progress
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                Complete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {/* OTHER DETAILS*/}
                  <View>
                      <Text>Ticket #</Text>
                      <Text>{qrcode}</Text>
                  </View> 

                  <View>
                      <Text>Created On</Text>
                      <Text>{}</Text>
                  </View>  

                  <View>
                      <Text>Assigned To</Text>
                      <Text>{}</Text>
                  </View> 

                  <View>
                      <Text>Created By some</Text>
                      <Text>{}</Text>
                  </View> 

                </View>

        </ScrollView>                 
    )
}

export default Details
