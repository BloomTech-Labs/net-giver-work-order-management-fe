import React, { useEffect, useState } from "react"
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native"
import { topBtn } from "../../assets/style/components/buttons"
import { spacer } from "../../assets/style/components/margins"
import { text } from "../../assets/style/components/text"
import { txtInput } from "../../assets/style/components/inputs"
import { color, font, marpad, cnt, mar } from "../../assets/style/base"
import { styles } from "../../assets/style"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_WORKORDERS = gql`
    query workorders($limit: Int) {
        workorders(limit: $limit) {
            edges {
                id
                detail
                createdAt
                qrcode
                priority
                status
                title
                user {
                    username
                }
                workorderphoto {
                    path
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;

const GET_WORKORDER = gql`
  query workorder($id: ID!) {
    workorder(id: $id) {
        id
        detail
        createdAt
        qrcode
        priority
        status
        title
        user {
          username
        }
        workorderphoto {
          path
        }
    }
  }
`;

const MyWorkOrders = props => {
    const { data, loading, error } = useQuery(GET_WORKORDERS, {
        variables: { limit: 20 },
    })

    console.log(props.navigation)

    return (
        <SafeAreaView style={cnt.cntNJ}>
            <Text style={text.header}>MyWorkOrders</Text>
        </SafeAreaView>
    )
}

export default MyWorkOrders
