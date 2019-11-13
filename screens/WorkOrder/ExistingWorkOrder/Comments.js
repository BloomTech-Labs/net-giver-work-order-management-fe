import React, { useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
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
import { wOList, styles } from "../../../components/Styles";

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

const img1 = require("../../../components/Images/ng.png");

const Comments = props => {
  const { data, loading, error } = useQuery(COMMENTS, {
    variables: { id: "226" }
  });
  const [addComment, { picloading, picerror }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      const { comments } = cache.readQuery({
        query: COMMENTS,
        variables: {
          id: "226"
        }
      });
      cache.writeQuery({
        query: COMMENTS,
        data: { comments: comments.concat([addComment]) }
      });
    }
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
      variables: { comment: { text: text, workorderId: workorderId } }
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

export default Comments;
