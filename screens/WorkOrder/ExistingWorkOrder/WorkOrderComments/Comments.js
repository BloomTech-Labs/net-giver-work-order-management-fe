import React, { useEffect } from "react";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useMutation, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import idx from "idx";
import gql from "graphql-tag";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Spinner
} from "native-base";

import { topBtn } from "../../../../assets/style/components/buttons";
import { spacer } from "../../../../assets/style/components/margins";
import { text } from "../../../../assets/style/components/text";
import { txtInput } from "../../../../assets/style/components/inputs";
import { color, font, marpad } from "../../../../assets/style/base";
import { styles } from "../../../../assets/style";

const COMMENTS = gql`
  query Workorder($id: ID!) {
    workorder(id: $id) {
      id
      comments {
        id
        text
        createdAt
        user {
          id
          username
          photo {
            path
          }
        }
      }
    }
  }
`;
const ADD_COMMENT = gql`
  mutation AddComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      id
      text
      createdAt
      user {
        id
        username
        photo {
          path
        }
      }
    }
  }
`;

const img1 = require("../../../../components/Images/ng.png");

const Comments = ({ navigation }) => {
  const {
    id,
    qrcode,
    detail,
    priority,
    status,
    title,
    user,
    user: { username },
    workorderphoto
  } = navigation.state.params;

  const { data, loading, error, refetch } = useQuery(COMMENTS, {
    variables: { id: id }
  });
  const [addComment, { picloading, picerror }] = useMutation(ADD_COMMENT, {
    onCompleted({ addComment }) {
      refetch();
    }
    // update(cache, { data: { addComment } }) {
    //   const { comments } = cache.readQuery({
    //     query: COMMENTS,
    //     variables: {
    //       id: "226"
    //     }
    //   });
    //   cache.writeQuery({
    //     query: COMMENTS,
    //     data: { comments: comments.concat([addComment]) }
    //   });
    // }
  });
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text style={wOList.title}>Loading</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={wOList.title}>Error :(</Text>
      </SafeAreaView>
    );

  async function onSend(messages) {
    const workorderId = "226";
    const text = messages[0].text;

    await addComment({
      variables: { comment: { text: text, workorderId: id } }
    });
  }

  return (
    <Container>
      <GiftedChat
        onSend={messages => onSend(messages)}
        // user={{
        //   _id: props.auth.user.id
        // }}
        messages={// (idx(queryResult, _ => _.data.group.chat.messages) || [])
        data.workorder.comments.map(comment => {
          return {
            _id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            user: {
              _id: comment.user.id,
              name: comment.user.username,
              avatar: comment.user.photo.path
            }
          };
        })}
      />
    </Container>
  );
};
const wOList = StyleSheet.create({
  card: {
    width: "100%",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 4,
    paddingLeft: 9,
    paddingRight: 14,
    paddingTop: 13,
    paddingBottom: 31,
    alignSelf: "center",
    flexDirection: "row"
  },
  info: {
    borderRadius: 4,
    height: 20
  },
  infoText: {
    fontSize: 14,
    textAlign: "center"
  },
  status: {
    width: 65,
    alignSelf: "flex-end"
  },

  priority: {
    width: 65,
    marginBottom: 6,
    marginTop: 6,
    marginLeft: 5
  },

  qr: {
    width: 65,
    color: "#8B9195",
    backgroundColor: "#F2F5F7",
    alignSelf: "flex-end",
    marginLeft: 5
  },

  qrBox: {
    flexDirection: "row"
  },

  cardMiddle: {
    //width: 160,
    flex: 1
    //paddingRight: 5,
  },

  priorityBox: {
    flexDirection: "column",
    marginLeft: "auto",
    alignSelf: "flex-end"
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    lineHeight: 22
  },
  cardSubContent: {
    flexDirection: "column"
  },
  cardLeft: {
    width: "auto"
  },
  cardRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto",
    marginTop: 6,

    marginBottom: 6
  },
  image: {
    flex: 1,
    flexWrap: "wrap",
    width: 64,
    height: 64,
    borderRadius: 4,
    marginRight: 22
  },
  title: {
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 1
  }
});

export default Comments;
