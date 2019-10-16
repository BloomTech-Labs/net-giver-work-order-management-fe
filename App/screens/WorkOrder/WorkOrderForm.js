import React from "react";
import { View, TextInput, Text, Button, Alert, SafeAreaView, Picker } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup"


function Form(props){
        var {
            handleChange, 
            handleBlur, 
            values, 
            errors, 
            touched,
            handleSubmit,
            navigation } = props; 

        return (
        <SafeAreaView>
            <View >
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

                <View  >
                <Button onPress={handleSubmit} 
                        title="Submit" 
                         />
                </View>
        
            </View>
        </SafeAreaView>
    )
}

function WorkOrderForm(props) {
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
                        status: ""
                    }}
                    onSubmit={(values, formikBag) => {
                        console.log("values", values)
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