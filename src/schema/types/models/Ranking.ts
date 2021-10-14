import { objectType } from "nexus";

export const generations = objectType({
  name: "Generation",
  definition(t) {
    t.int("_id");
    t.int("count");
  },
});
