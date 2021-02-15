import React, { useContext } from "react";
import { Card, Button, Image, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    gender,
  },
}) => {
  const { user } = useContext(AuthContext);

  console.log(likes);

  return (
    <Card className="card">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={
            gender === "male"
              ? "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              : "https://react.semantic-ui.com/images/avatar/large/molly.png"
          }
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(new Date(parseInt(createdAt))).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button as="link" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic size="mini">
            <Icon name="comments" />
          </Button>

          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
