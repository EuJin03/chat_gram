import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/query";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <div className="home">
      <Grid columns={3} divided>
        <Grid.Row className="home__title">
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column className="home__createPost">
            {user && <PostForm />}
          </Grid.Column>
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map(post => (
                  <Grid.Column key={post.id}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
