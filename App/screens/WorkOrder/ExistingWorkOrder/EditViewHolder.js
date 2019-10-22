import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
//THIS IS THE EDIT / VIEW WORK ORDER COMPONENT AFTER THE BARCODE IS FOUND...

const EditViewHolder = props => {
  //   const [hide, setHide] = useState(true);

  // const hideButton = e => {
  //     setHide(false)
  // }

  // useEffect(() => {
  //   hideButton
  // }, [hide])

  var { handleChange, values } = props;

  // if(hide) { return ()} else

  //WORKORDER PROPS ARE PASSED IN FROM THE CHECKBARCODE PAGE
  console.log(
    "TCL: Workorder -> props",
    props.navigation.state.params.workOrder.isWorkOrder.workorder
  );
  const workOrderProps =
    props.navigation.state.params.workOrder.isWorkOrder.workorder;
  const title = workOrderProps.title;
  const details = workOrderProps.detail;
  const priority = workOrderProps.priority;
  const status = workOrderProps.status;
  console.log("work order props title", workOrderProps.title);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PLACEHOLDER FOR EDIT/VIEW AFTER BARCODE SCANNED
        </Text>
        <Text> {title} </Text>
        <Text> {details} </Text>
        <Text> {priority} </Text>

        <Text>Status</Text>
        <View>
          <Picker selectedValue={status} onValueChange={handleChange("status")}>
            <Picker.Item label="Not yet Started" value="Not yet Started" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Complete" value="Complete" />
          </Picker>
        </View>

        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function WorkOrderView(props) {
  var { navigation } = props;
  return (
    <View>
      onSubmit=
      {(values, props) => {
        const editMutation = `mutation {
  editWorkorder( qrcode: "${values.qrcode}", priority: "${values.priority}"){
    priority
  }
}`;
      }}
      render=
      {props => {
        return <EditViewHolder {...props} navigation={navigation} />;
      }}
      />
    </View>
  );
}

//function on the ubmit handler w/ edit mutation with just the qr code and priorities

const styles = StyleSheet.create({
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
  goBack: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  }
});

export default EditViewHolder;

//SD 10/16/19 PLACEHOLDER
