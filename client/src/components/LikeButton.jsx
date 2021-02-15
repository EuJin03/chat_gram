import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Button, Label, Icon, Popup, Divider } from "semantic-ui-react";

import MyPopup from "../utils/MyPopup";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal" size="mini">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic size="mini">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic size="mini">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup
        content={
          likes.length > 0 ? (
            <div className="like__div">
              {likes.map((like, index) => (
                <>
                  <p key={index}>{like.username}</p>
                </>
              ))}
            </div>
          ) : (
            <p className="like__p">Give a like!</p>
          )
        }
      >
        {likeButton}
      </MyPopup>
      <Label basic color="teal" pointing="left" size="mini">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
