import React, { useContext } from "react";
import { Card, Button, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  const likePost = () => {
    console.log("liked post");
  };

  const commentPost = () => {
    console.log("comment post");
  };
  return (
    <Card className="card">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
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
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            floated="right"
            size="mini"
            onClick={() => console.log("deletePost")}
          >
            <Icon name="trash" style={{ margin: "auto" }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
