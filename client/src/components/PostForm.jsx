import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/query";

const PostForm = () => {
  const { values, formHandler, valueHandler } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={formHandler}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Share your thoughts!"
            name="body"
            onChange={valueHandler}
            value={values.body}
            error={error ? true : false}
          ></Form.Input>
          <Button type="submit" color="teal">
            Post It!
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
