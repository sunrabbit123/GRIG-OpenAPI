import { makeSchema } from "nexus";
import * as resolvers from "./types";
export const schema = makeSchema({
  types: resolvers,
  outputs: {
    schema: __dirname + "/../../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
});
