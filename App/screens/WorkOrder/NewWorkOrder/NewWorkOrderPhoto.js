//SD 10/16/19 //STILL NEED TO BUILD PAGE

import React from 'react'
import {Text} from 'react-native'
const NewWorkOrderPhoto = (props) => {
    console.log("TCL: NewWorkOrderPhoto -> props", props)
    const createMutation = `mutation {
        createWorkorder( qrcode: "${qrCode}"){
          id
          qrcode
          detail
          createdAt
          priority
          status
          title
        }
      }`;
    return (
        <>

            <Text> Ask for Galery or Camera</Text>
        </>
    )
}

export default NewWorkOrderPhoto

