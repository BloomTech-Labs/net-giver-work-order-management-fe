import React, { useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Platform
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useMutation, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import idx from "idx";
import gql from "graphql-tag";
import { Container, Text } from "native-base";
import CustomActions from "./CustomActions";
import { styles } from "../../../../assets/style";

const COMMENTS = gql`
  query Workorder($id: ID!) {
    workorder(id: $id) {
      id
      comments {
        id
        text
        createdAt
        image
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
      image
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

const Comments = ({ navigation }) => {
  const { id } = navigation.state.params;

  const { data, loading, error, refetch } = useQuery(COMMENTS, {
    variables: { id: id }
  });
  const [addComment, { picloading, picerror }] = useMutation(ADD_COMMENT, {
    onCompleted({ addComment }) {
      refetch();
    }
  });

  const renderCustomActions = props =>
    Platform.OS === "web"
      ? null
      : <CustomActions {...props} onSend={messages => onSend(messages)} />;

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
        <Text style={wOList.title}>Error </Text>
      </SafeAreaView>
    );

  async function onSend(messages) {
    const text = messages[0].text;
    const image = messages[0].image;

    await addComment({
      variables: {
        comment: { text: text, workorderId: id, photo: image }
      }
    });
  }

  return (
    <Container>
      <GiftedChat
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        renderActions={renderCustomActions}
        // user={{
        //   _id: 1,
        //   name: "bryant"
        // }}
        messages={// (idx(queryResult, _ => _.data.group.chat.messages) || [])
        data.workorder.comments.map(comment => {
          return {
            _id: comment.id,
            text: comment.text,
            createdAt: new Date(comment.createdAt),
            image: comment.image,
            user: {
              _id: comment.user.id,
              name: comment.user.username,
              avatar: comment.user.photo
                ? comment.user.photo.path
                : "http://placehold.jp/006e13/ffffff/80x100.png?text=Placeholder%20Image"
            }
          };
        })}
      />
    </Container>
  );
};
const wOList = StyleSheet.create({
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
