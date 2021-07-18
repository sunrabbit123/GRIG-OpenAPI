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
    // t.list.field("repo", {
    //   type: "Repository",
    //   resolve: async (root: any, _, __) => {
    //     return 1;
    //   },
    // });
    t.int("star", {
      resolve: async (root: any, _, __) => {
        return 1;
      },
    });
  },
});
