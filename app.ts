import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./src/schema";

const STAGE = process.env.STAGE || "dev";
const DEBUG = STAGE == "dev" ? true : false;

const apollo = new ApolloServer({
  schema,
  debug: DEBUG,
});

exports.graphqlHandler = apollo.createHandler({});
