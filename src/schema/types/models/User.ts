import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("name");
    t.int("generation");
    t.string("nickname");
    t.int("contribution", {
      resolve: async (root: any, _, __) => {
        return 1;
      },
    });
    t.int("followers");
    t.int("following");
    t.string("repos_url");
    t.int("public_repos");
    // t.list.field("repos", {
    //   type: "Repository",
    //   resolve: async (root: any, _, __) => {
    //     return 1;
    //   },
    // });
    t.string("company");
    t.string("blog");
    t.string("location");
    t.string("email");
    t.string("bio");
    t.string("twitter_username");
    t.int("star", {
      resolve: async (root: any, _, __) => {
        return 1;
      },
    });
  },
});
