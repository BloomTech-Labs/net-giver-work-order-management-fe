import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';


const WorkOrderCard = (props) => { 

    return (
        <TouchableOpacity 
            style={{ 
                flex: 1, alignItems: 'center' 
            }}>
            <View 
                style={styles.container}>

                {/* Work Order Image */}
                <View> 
                    <Image source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/1920px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg'
                        }} 
                        style={styles.image}
                    />
                </View>

                {/* Work Order Location */}
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 10
                        }}>
                        Worker Order 1
                    </Text>
                </View>

                {/* Work Order Priority */}
                <View>
                    <Text 
                        style={styles.priority}>
                        High
                    </Text>
                </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { 
        paddingVertical: 10, 
        width: 350, 
        borderColor: '#000', 
        borderWidth: 0.5, 
        borderRadius: 5, 
        marginHorizontal: 10, 
        marginVertical: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    image: {
        borderRadius: 40,
        marginHorizontal: 10,   
        width: 80, 
        height: 80 
    },
    priority: {
        marginHorizontal: 10,
        backgroundColor: 'red',
        padding: 4,
        fontWeight: 'bold',
        borderRadius: 5, 
    },
});

export default WorkOrderCard