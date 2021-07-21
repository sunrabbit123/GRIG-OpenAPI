import { makeSchema } from "nexus";
import * as resolvers from "./types";

export const schema = makeSchema({
  types: resolvers,
});
