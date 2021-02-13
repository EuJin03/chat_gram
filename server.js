import { config } from "dotenv";
config();
import colors from "colors";

import { ApolloServer } from "apollo-server";
import connectDB from "./config/db.js";
import Post from "./model/Post.js";
import User from "./model/User.js";
import { typeDefs } from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

connectDB();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const __port__ = process.env.PORT || 5000;

server.listen(
  __port__,
  console.log(`Server is running on port ${__port__}`.green.bold.underline)
);
