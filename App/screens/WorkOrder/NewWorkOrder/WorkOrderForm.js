import React, {useState, useEffect} from "react";
import { View, TextInput, Text, Button, Alert, SafeAreaView, Picker, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup"
import { TouchableOpacity } from "react-native-gesture-handler";



function Form(props){
const [hide, setHide] = useState(true);

const hideButton = e => {
    setHide(false)
}

useEffect(() => {
   hideButton   
}, [hide])

    console.log("props", props)
        var {
            handleChange, 
            handleBlur, 
            values, 
            errors, 
            touched,
            handleSubmit,
            navigation } = props;
                        
            const qrcode = props.navigation.state.params.qrCode.qrCode
if (hide) {
        return (
        <SafeAreaView>
            <View >
                <View> 
                    <TextInput
                    name="qrcode"
                    />

                        </View>
                <Text> Title </Text>
                <View >
                    <TextInput
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                    />
                </View>

                <Text  >
                {errors.title && touched.title
                    ? errors.title 
                    :null}
                </Text>

                <Text>Detail</Text>

                <View>
                    <TextInput
                    
                        textContentType={"detail"}
                        onChangeText={handleChange("detail")}
                        onBlur={handleBlur("detail")}
                        value={values.detail}
                    />
                </View>

                <Text  >
                {errors.detail && touched.detail
                    ? errors.detail 
                    : null}
                </Text>

                <Text>Priority</Text>

                <View>
                    <Picker selectedValue={values.priority} onValueChange={handleChange("priority")} >
                    <Picker.Item label="Emergency" value="Emergency" />
                    <Picker.Item label="High" value="High" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Low" value="Low" />
                    </Picker>
                </View>
                
                <Text>Status</Text>

                <View>
                    <Picker selectedValue={values.status} onValueChange={handleChange("status")} >
                    <Picker.Item label="Not yet Started" value="Not yet Started" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Complete" value="Complete" />
                    </Picker>
                </View>
                <View>
                    <TouchableOpacity onPress={hideButton}>
                        <Text>ChoosePhoto</Text>
                    </TouchableOpacity>
                
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                
                </View>
          
        
            </View>
        </SafeAreaView>
    )} else {return (
        <SafeAreaView>
            <View >
                <View> 
                    <TextInput
                    name="qrcode"
                    />

                        </View>
                <Text> Title </Text>
                <View >
                    <TextInput
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                    />
                </View>

                <Text  >
                {errors.title && touched.title
                    ? errors.title 
                    :null}
                </Text>

                <Text>Detail</Text>

                <View>
                    <TextInput
                    
                        textContentType={"detail"}
                        onChangeText={handleChange("detail")}
                        onBlur={handleBlur("detail")}
                        value={values.detail}
                    />
                </View>

                <Text  >
                {errors.detail && touched.detail
                    ? errors.detail 
                    : null}
                </Text>

                <Text>Priority</Text>

                <View>
                    <Picker selectedValue={values.priority} onValueChange={handleChange("priority")} >
                    <Picker.Item label="Emergency" value="Emergency" />
                    <Picker.Item label="High" value="High" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Low" value="Low" />
                    </Picker>
                </View>
                
                <Text>Status</Text>

                <View>
                    <Picker selectedValue={values.status} onValueChange={handleChange("status")} >
                    <Picker.Item label="Not yet Started" value="Not yet Started" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Complete" value="Complete" />
                    </Picker>
                </View>
                <View >
                    <View style={styles.display}>
                        <TouchableOpacity>
                            <Text>Choose From Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Camera', {from: "workOrderFormNew"})}>
                            <Text >Take A Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  >
                <TouchableOpacity onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View>


                </View>
        
            </View>
        </SafeAreaView>
    )

    }
}
const styles = StyleSheet.create({
    hidden: {
        display:"none"
    },
})

function WorkOrderForm(props) {
    const {qrCode} = props.navigation.state.params.qrCode
    console.log("the big one", props.navigation.state.params.qrCode.qrCode)
console.log("TCL: WorkOrderForm -> qrCode", qrCode)
    console.log("TCL: WorkOrderForm -> props", props)
    var schema = Yup.object().shape({
        title: Yup.string(),
        detail: Yup.string().min(6).required(),
        priority: Yup.string().required(),
        status: Yup.string().required()
    })
    var {navigation} = props;
    return (
        <View >
            <View >
                <Text >Work Order</Text>
            </View>
            <View >
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        title: "",
                        detail: "",
                        priority: "",
                        status: "",
                        qrcode: qrCode

                    }}
                    onSubmit={(values, formikBag, props) => {
                        // console.log("on submit props", props)
                        console.log("values", values)
                        // console.log("formik bag", formikBag)
                        // console.log("qr code", qrcode)
                        console.log("values detail", values.detail)
                    //     const qrcode = "00000"
                    //     const editMutation = `mutation {
                    //         editWorkorder( qrcode: "${qrcode}", detail: "${values.detail}", priority: "${values.priority}, status: "${values.status}, title: "${values.title}){
                    //           qrcode
                    //           detail
                    //           priority
                    //           status
                    //           title
                    //         }
                    //       }`
                        
                    //     axios({
                    //         method: "post",
                    //         url: "https://netgiver-stage.herokuapp.com/graphql",
                    //         headers: {
                    //           "x-token":
                    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJza3lsZXIyNDQwQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2t5bGVyZCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU3MTM1MTE4MCwiZXhwIjoxNTcxMzUyOTgwfQ.rKtfQ4YsKWf92Cjrz3QOKkyAOeQ84Mi8J7bpocnHGbQ"      },
                    //         data: {
                    //           query: editMutation
                    //         }
                    //       }).then(res => {
                    //           console.log("response", res)
                    //       });
                    }}
        
                    render={(props) => {
                        return <Form {...props} navigation={navigation}/>
                    }}
                />
            </View>
        </View>
    )
}
export default WorkOrderForm;