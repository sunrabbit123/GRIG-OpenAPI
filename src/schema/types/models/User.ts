import { objectType } from "nexus";
import { getKindOfGenaration } from "../../../service/user";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("name");
    t.field("generation", {
      type: "Generation",
      resolve: (_, __, ___) => {
        return getKindOfGenaration();
      },
    });
    t.int("generation");
    t.string("nickname");
    t.int("followers");
    t.int("following");
    t.string("repos_url");
    t.int("public_repos");
    t.string("company");
    t.string("blog");
    t.string("location");
    t.string("email");
    t.string("bio");
    t.string("twitter_username");
    t.int("contributions");
    t.int("pullRequests");
    t.int("issues");
    t.int("publicRepositories");
    t.int("stared");
    t.int("forked");
  },
});

export const generations = objectType({
  name: "Generation",
  definition(t) {
    t.int("_id");
    t.int("count");
  },
});
